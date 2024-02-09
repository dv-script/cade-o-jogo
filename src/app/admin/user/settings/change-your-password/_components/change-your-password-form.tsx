"use client";
import { changeYourPassword } from "@/actions/change-your-password";
import { Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { FormError } from "@/components/form-error";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { SubmitButton } from "@/components/submit-button";

export function ChangeYourPasswordForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(changeYourPassword, initialState);

  useEffect(() => {
    if (state?.success === true) {
      toast.success(state.message);
    }
  }, [state?.message, state?.success]);

  return (
    <form
      action={dispatch}
      className="w-full flex flex-col gap-4 bg-zinc-900 py-12 px-8 rounded-lg"
    >
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Change your password</h1>
        <p className="text-gray-500 text-sm">
          Enter your current password and your new password below.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Input
          name="currentPassword"
          label="Current Password"
          type="password"
          placeholder="Enter the current password"
        />
        {state?.errors?.currentPassword &&
          state.errors.currentPassword.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
      </div>

      <div className="flex flex-col gap-2">
        <Input
          name="password"
          label="New Password"
          type="password"
          placeholder="Enter a new password"
        />
        {state?.errors?.password &&
          state.errors.password.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
      </div>

      <div className="flex flex-col gap-2">
        <Input
          name="passwordConfirmation"
          placeholder="Confirm the new password"
          label="Confirm New Password"
          type="password"
        />
        {state?.errors?.passwordConfirmation &&
          state.errors.passwordConfirmation.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
      </div>

      {state?.success === false && <FormError errorMessage={state.message} />}

      <SubmitButton color="primary" style="w-full" title="Change Password" />
    </form>
  );
}
