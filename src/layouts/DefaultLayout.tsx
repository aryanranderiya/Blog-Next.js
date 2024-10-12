export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100vh] h-fit flex-col w-full sm:gap-4 container_main relative">
      {children}
    </div>
  );
}
