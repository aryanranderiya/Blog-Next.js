export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[90vh] h-fit flex-col w-full sm:gap-7 container_main">
      {children}
    </div>
  );
}
