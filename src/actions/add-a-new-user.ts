"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

const addANewUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  lastName: z
    .string()
    .min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  roles: z.array(z.string()),
  createdAt: z.date(),
});

export type State = {
  errors?: {
    email?: string[];
    firstName?: string[];
    lastName?: string[];
    password?: string[];
    roles?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function addANewUser(prevState: State, formData: FormData) {
  const allRoles = formData.getAll("roles");
  const checkedRoles = allRoles.filter((role) => role !== "off");

  const validatedFields = addANewUserSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
    roles: checkedRoles,
    createdAt: new Date(),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { email, firstName, lastName, password, roles, createdAt } =
    validatedFields.data;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.users.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashPassword,
        status: "active",
        roles: roles,
        createdAt: createdAt,
      },
    });

    revalidatePath("/admin/users");
    return {
      message: "Usuário criado com sucesso.",
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      message: "Algo deu errado. Por favor, tente novamente.",
    };
  }
}
