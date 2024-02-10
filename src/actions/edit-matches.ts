"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const EditMatchesFormSchema = z.object({
  id: z.string(),
  hboMax: z.string(),
  canalTnt: z.string(),
  playPlus: z.string(),
  canalRecord: z.string(),
  cazeTv: z.string(),
  paulistaoPlay: z.string(),
  camisa21: z.string(),
  futebolPaulista: z.string(),
  canalFutura: z.string(),
  paulistao: z.string(),
  sportv: z.string(),
  globo: z.string(),
  premiere: z.string(),
});

export type State = {
  errors?: {
    hboMax?: string[];
    canalTnt?: string[];
    playPlus?: string[];
    canalRecord?: string[];
    cazeTv?: string[];
    paulistaoPlay?: string[];
    camisa21?: string[];
    futebolPaulista?: string[];
    canalFutura?: string[];
    paulistao?: string[];
    sportv?: string[];
    globo?: string[];
    premiere?: string[];
  };
  message: string;
  success?: boolean;
};

export async function editMatch(prevState: State, formData: FormData) {
  const validatedFields = EditMatchesFormSchema.safeParse({
    id: formData.get("id"),
    hboMax: formData.get("hboMax"),
    canalTnt: formData.get("canalTnt"),
    playPlus: formData.get("playPlus"),
    canalRecord: formData.get("canalRecord"),
    cazeTv: formData.get("cazeTv"),
    paulistaoPlay: formData.get("paulistaoPlay"),
    camisa21: formData.get("camisa21"),
    futebolPaulista: formData.get("futebolPaulista"),
    canalFutura: formData.get("canalFutura"),
    paulistao: formData.get("paulistao"),
    sportv: formData.get("sportv"),
    globo: formData.get("globo"),
    premiere: formData.get("premiere"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const {
    id,
    hboMax,
    camisa21,
    canalFutura,
    canalRecord,
    canalTnt,
    cazeTv,
    futebolPaulista,
    globo,
    paulistao,
    paulistaoPlay,
    playPlus,
    premiere,
    sportv,
  } = validatedFields.data;

  try {
    await prisma.matches.update({
      where: {
        id,
      },
      data: {
        camisa21,
        canalFutura,
        canalRecord,
        canalTnt,
        cazeTv,
        futebolPaulista,
        globo,
        hboMax,
        paulistao,
        paulistaoPlay,
        playPlus,
        premiere,
        sportv,
      },
    });
    revalidatePath("/admin/dashboard/matches");
    return { message: "Partida atualizada com sucesso.", success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { message: "Falha ao atualizar a partida", success: false };
    }
    throw error;
  }
}
