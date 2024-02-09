import { DefaultHeader } from "@/components/default-header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DefaultHeader />
      {children}
    </>
  );
}
