import { LoginForm } from "@/app/auth/sign-in/_components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadê o Jogo? - Painel de Administrador | Entrar",
  description:
    "Acesse o painel de administrador do Cadê o Jogo? para gerenciar partidas, usuários e conteúdo.",
};

export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
      <LoginForm />
    </div>
  );
}
