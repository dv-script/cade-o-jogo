import { prisma } from "@/lib/prisma";

export async function getAllMatches() {
  try {
    const matches = await prisma.matches.findMany({
      orderBy: {
        round: "asc",
      },
    });
    return matches;
  } catch (error) {
    return console.log(error);
  }
}
