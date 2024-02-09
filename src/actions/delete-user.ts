"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  try {
    await prisma.users.delete({
      where: {
        id: userId,
      },
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}
