import { AdminHeader } from "@/components/admin-header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
