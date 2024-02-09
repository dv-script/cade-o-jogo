"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { authenticateUser } from "@/actions/authenticate-user";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@nextui-org/react";

export function LoginForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(authenticateUser, initialState);

  return (
    <form
      action={dispatch}
      className="max-w-lg p-8 bg-zinc-900 text-white rounded-lg flex flex-col justify-center items-center gap-8 md:p-4 md:gap-4"
    >
      <h1 className="text-[1.25rem] font-semibold">
        Painel de Administrador | Cadê o Jogo?
      </h1>
      <p className="text-sm">
        Bem-vindo ao Painel de Administrador do Cadê o Jogo?. Este portal é
        dedicado exclusivamente para administradores e gestores de conteúdo,
        fornecendo acesso a ferramentas avançadas de gerenciamento do site. Para
        garantir a segurança e a integridade das informações, é necessário
        autenticar sua identidade.
      </p>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            name="email"
            label="E-mail"
            placeholder="Insira seu e-mail"
            className="w-full"
          />
          {state?.errors?.email?.map((error) => (
            <span
              key={error}
              aria-live="polite"
              className="text-red-500 text-sm"
            >
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            name="password"
            type="password"
            label="Senha"
            placeholder="Insira sua senha"
            className="w-full"
          />
          {state?.errors?.password?.map((error) => (
            <span
              key={error}
              aria-live="polite"
              className="text-red-500 text-sm"
            >
              {error}
            </span>
          ))}
        </div>
      </div>
      {state?.success === false && <FormError errorMessage={state.message} />}
      <SubmitButton color="primary" style="w-full" title="Sign in" />
      <Link href="forgot-your-password">
        <span className="text-sm text-zinc-400 text-center hover:text-white hover:underline">
          Esqueceu a senha?
        </span>
      </Link>
    </form>
  );
}
