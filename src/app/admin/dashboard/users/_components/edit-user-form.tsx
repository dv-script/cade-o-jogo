import { useFormState } from "react-dom";
import { editUser } from "@/actions/edit-user";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect } from "react";
import { allRoles } from "@/constants/all-roles";
import { IUser } from "@/types/IUser";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";

const status = [
  {
    key: "active",
    color: "bg-blue-500",
    label: "Ativo",
  },
  {
    key: "inactive",
    color: "bg-red-500",
    label: "Inativo",
  },
  {
    key: "paused",
    color: "bg-yellow-500",
    label: "Pausado",
  },
];

interface EditUserFormProps {
  onClose: () => void;
  user: IUser;
}

export function EditUserForm({ onClose, user }: EditUserFormProps) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(editUser, initialState);

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [onClose, state.success]);

  return (
    <form action={dispatch}>
      <ModalHeader className="flex flex-col gap-1">Editar Usuário</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          label="Email"
          placeholder="Insira o endereco de email do usuario"
          variant="bordered"
          defaultValue={user.email}
          name="email"
        />
        {state.errors?.email &&
          state.errors.email.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
        <Input
          label="Nome"
          placeholder="Insira o nome do usuário"
          variant="bordered"
          defaultValue={user.firstName}
          name="firstName"
        />
        {state.errors?.firstName &&
          state.errors.firstName.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
        <Input
          label="Insira o sobrenome do usuário"
          placeholder="Enter the last name of the user"
          variant="bordered"
          defaultValue={user.lastName}
          name="lastName"
        />
        {state.errors?.lastName &&
          state.errors.lastName.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}

        <Select
          label="Status"
          placeholder="Selecione o status do usuário"
          defaultSelectedKeys={[user.status]}
          name="status"
        >
          {status.map((item) => (
            <SelectItem
              key={item.key}
              startContent={
                <span
                  className={`inline-block w-2 h-2 rounded-full ${item.color}`}
                ></span>
              }
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>

        {state.errors?.status &&
          state.errors.status.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}

        <ul className="flex flex-col gap-2 py-2 px-1">
          {allRoles.map((role) => (
            <li key={role.key}>
              <Checkbox
                name="roles"
                value={role.key}
                defaultSelected={user.roles.includes(role.key)}
                classNames={{
                  label: "text-small",
                }}
              >
                {role.name}
              </Checkbox>
            </li>
          ))}
          {state.errors?.roles &&
            state.errors.roles.map((error) => (
              <p
                aria-live="polite"
                key={error}
                className="text-xs text-red-500"
              >
                {error}
              </p>
            ))}
        </ul>
      </ModalBody>
      <ModalFooter>
        {state.success === false && <FormError errorMessage={state.message} />}
        <Button type="reset" color="danger" variant="flat">
          Reset
        </Button>
        <SubmitButton title="Confirm" color="primary" />
      </ModalFooter>
    </form>
  );
}
