"use client";
import { useFormState } from "react-dom";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useEffect } from "react";
import { IMatchesFromDb } from "@/types/IMatchesFromDb";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { allStreamings } from "@/constants/all-streamings";
import { editMatch } from "@/actions/edit-matches";

interface EditMatchFormProps {
  onClose: () => void;
  match: IMatchesFromDb;
}

export function EditMatchesForm({ onClose, match }: EditMatchFormProps) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(editMatch, initialState);

  const streamings = [
    { key: "camisa21", url: match.camisa21 },
    { key: "canalFutura", url: match.canalFutura },
    { key: "canalRecord", url: match.canalRecord },
    { key: "canalTnt", url: match.canalTnt },
    { key: "cazeTv", url: match.cazeTv },
    { key: "futebolPaulista", url: match.futebolPaulista },
    { key: "globo", url: match.globo },
    { key: "hboMax", url: match.hboMax },
    { key: "paulistao", url: match.paulistao },
    { key: "paulistaoPlay", url: match.paulistaoPlay },
    { key: "playPlus", url: match.playPlus },
    { key: "premiere", url: match.premiere },
    { key: "sportv", url: match.sportv },
  ];

  const errorsStreamings = [
    state?.errors?.camisa21,
    state?.errors?.canalFutura,
    state?.errors?.canalRecord,
    state?.errors?.canalTnt,
    state?.errors?.cazeTv,
    state?.errors?.futebolPaulista,
    state?.errors?.globo,
    state?.errors?.hboMax,
    state?.errors?.paulistao,
    state?.errors?.paulistaoPlay,
    state?.errors?.playPlus,
    state?.errors?.premiere,
    state?.errors?.sportv,
  ];

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [onClose, state.success]);

  return (
    <form action={dispatch}>
      <ModalHeader className="flex flex-col gap-1">
        Editar Partida - {match.teamHome} x {match.teamAway}
      </ModalHeader>
      <ModalBody>
        <input hidden name="id" value={match.id} />
        <ul className="flex flex-col gap-2 py-2 px-1">
          {allStreamings.map((streaming) => (
            <li key={streaming.key}>
              <Input
                type="text"
                name={streaming.key}
                label={streaming.name}
                placeholder={`Insira o link da transmissão do ${streaming.name}`}
                defaultValue={
                  streamings.find((s) => s.key === streaming.key)?.url
                }
              />
              {errorsStreamings.map((error) => (
                <>
                  {error &&
                    error.map((e) => (
                      <p
                        aria-live="polite"
                        key={e}
                        className="text-xs text-red-500"
                      >
                        {e}
                      </p>
                    ))}
                </>
              ))}
            </li>
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
