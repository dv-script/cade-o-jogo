import { ChangeYourPasswordForm } from "@/app/admin/user/settings/change-your-password/_components/change-your-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FPF - Change Your Password",
  description:
    "Change your password to ensure the security of your account and protect your personal information.",
};

export default function Page() {
  return (
    <main className="background w-full h-[calc(100vh-9.75rem)] flex justify-center items-center">
      <div className="max-w-[1300px] flex flex-col">
        <ChangeYourPasswordForm />
      </div>
    </main>
  );
}
