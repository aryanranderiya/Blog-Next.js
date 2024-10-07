export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[90vh] h-fit flex-col w-full sm:gap-7 sm:pr-24 sm:py-[50px]  p-[2em]">
      {children}
    </div>
  );
}
