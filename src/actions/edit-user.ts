"use server";
import { auth } from "@/app/auth/providers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const EditUserFormSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido." }),
  firstName: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  lastName: z
    .string()
    .min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" }),
  roles: z.array(z.string()).min(1, "Deve haver pelo menos 1 cargo."),
  status: z
    .string()
    .refine((value) => !!value, { message: "Status é obrigatório" }),
  updatedAt: z.string(),
  updatedBy: z.string(),
});

export type State = {
  errors?: {
    email?: string[];
    firstName?: string[];
    lastName?: string[];
    roles?: string[];
    status?: string[];
  };
  message: string;
  success?: boolean;
};

export async function editUser(prevState: State, formData: FormData) {
  const session = await auth();
  const allRoles = formData.getAll("roles");
  const checkedRoles = allRoles.filter((role) => role !== "off");

  const validatedFields = EditUserFormSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    status: formData.get("status"),
    roles: checkedRoles,
    updatedAt: new Date().toISOString(),
    updatedBy: session?.user.email,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { email, firstName, lastName, roles, updatedAt, status, updatedBy } =
    validatedFields.data;

  try {
    await prisma.users.update({
      where: {
        email: email as string,
      },
      data: {
        firstName,
        lastName,
        email,
        roles,
        updatedAt,
        status,
        updatedBy,
      },
    });
    revalidatePath("/admin");
    return { message: "Usuário atualizado com sucesso.", success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { message: "Falha ao atualizar o usuário", success: false };
    }
    throw error;
  }
}
