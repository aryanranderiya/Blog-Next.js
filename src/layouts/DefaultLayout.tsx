export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[90vh] h-[90vh] flex-col w-full sm:gap-7 sm:pr-24 sm:pt-[50px] sm:pb-[300px] p-[2em]">
      {children}
    </div>
  );
}
