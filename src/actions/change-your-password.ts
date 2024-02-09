"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { auth } from "@/app/auth/providers";

const changeYourPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, {
      message: "The current password has to be at least 6 characters long",
    }),
  password: z
    .string()
    .min(6, {
      message: "The new password has to be at least 6 characters long",
    }),
  passwordConfirmation: z
    .string()
    .min(6, {
      message: "The password confirmation has to be at least 6 characters long",
    }),
});

export type State = {
  errors?: {
    currentPassword?: string[];
    password?: string[];
    passwordConfirmation?: string[];
  };
  message?: string;
  sucess?: boolean;
};

export async function changeYourPassword(prevState: State, formData: FormData) {
  const session = await auth();

  const validatedFields = changeYourPasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please, fill in the fields correctly.",
    };
  }

  const { currentPassword, password, passwordConfirmation } =
    validatedFields.data;

  if (password !== passwordConfirmation) {
    return {
      errors: {
        passwordConfirmation: ["Passwords do not match"],
      },
      message: "Please, fill in the fields correctly.",
    };
  }

  const user = await prisma.users.findUniqueOrThrow({
    where: {
      email: session?.user.email as string,
    },
  });

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);

  if (!passwordMatch) {
    return {
      errors: {
        currentPassword: ["Current password is incorrect"],
      },
      message: "Please, fill in the fields correctly.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: "Password has been changed successfully.",
      success: true,
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please, try again later.",
      success: false,
    };
  }
}
