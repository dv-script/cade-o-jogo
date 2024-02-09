"use server";
import { prisma } from "@/lib/prisma";

export async function getAllUsers() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        roles: true,
        createdAt: true,
        updatedAt: true,
        updatedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  } catch (error) {
    return console.log(error);
  }
}
