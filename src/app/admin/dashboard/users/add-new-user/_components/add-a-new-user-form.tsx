"use client";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PiCaretLeft, PiPassword } from "react-icons/pi";
import { addANewUser } from "@/actions/add-a-new-user";
import { createHash } from "@/utils/createHash";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { allRoles } from "@/constants/all-roles";
import toast from "react-hot-toast";
import { SubmitButton } from "@/components/submit-button";

export function AddANewUserForm() {
  const [password, setPassword] = useState("");
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(addANewUser, initialState);

  function generatePassword() {
    const hash = createHash();
    setPassword(hash);
  }

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    }
  }, [state?.success, state?.message]);

  return (
    <form
      action={dispatch}
      className="max-w-3xl w-full p-8 my-8 mx-4 bg-zinc-900 text-white rounded-lg flex flex-col gap-6"
    >
      <div className="relative flex items-center justify-center w-full">
        <Button
          as={Link}
          href="/admin/dashboard/users"
          className="absolute left-0"
          radius="full"
          isIconOnly
        >
          <PiCaretLeft />
        </Button>
        <h1 className="text-2xl font-semibold">Adicionar novo usuário</h1>
      </div>
      <p className="text-sm text-center text-zinc-300">
        Adicione um novo usuário ao sistema para que ele possa acessar e
        gerenciar partidas e usuários.
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            name="email"
            label="E-mail"
            placeholder="Insira o endereço de e-mail do usuário"
            className="w-full"
          />
          {state?.errors?.email?.map((error: string) => (
            <span key={error} className="text-red-500 text-sm">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-center align-center gap-2">
            <Input
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Senha"
              type="text"
              placeholder="Insira a senha do usuário"
              className="w-full"
            />
            <Button
              type="button"
              onClick={generatePassword}
              color="primary"
              className="h-full py-5"
            >
              <PiPassword />
            </Button>
          </div>
          {state?.errors?.password?.map((error: string) => (
            <span key={error} className="text-red-500 text-sm">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4 md:grid grid-cols-2">
          <div className="flex flex-col gap-2">
            <Input
              name="firstName"
              label="Nome"
              placeholder="Insira o nome do usuário"
            />
            {state?.errors?.firstName?.map((error: string) => (
              <span key={error} className="text-red-500 text-sm">
                {error}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              name="lastName"
              label="Sobrenome"
              placeholder="Insira o sobrenome do usuário"
            />
            {state?.errors?.lastName?.map((error: string) => (
              <span key={error} className="text-red-500 text-sm">
                {error}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-300">
            Cargos
          </span>
          {state?.errors?.roles?.map((error: string) => (
            <span key={error} className="text-red-500 text-sm">
              {error}
            </span>
          ))}

          <ul className="flex flex-col gap-2 py-2 px-1">
            {allRoles.map((role) => (
              <li key={role?.key}>
                <Checkbox
                  name="roles"
                  value={role?.key}
                  classNames={{
                    label: "text-small",
                  }}
                >
                  {role?.name}
                </Checkbox>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SubmitButton title="Adicionar novo usuário" color="primary" />
    </form>
  );
}
