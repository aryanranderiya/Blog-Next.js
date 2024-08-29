import Image from "next/image";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen h-fit flex-col gap-5 px-24 pt-20 pb-24">
      <div className="flex items-center gap-2">
        <Image
          src="https://github.com/aryanranderiya.png"
          alt="Profile Picture"
          width={40}
          height={40}
        />

        <div className="flex flex-col">
          <span className="text-sm font-semibold">Aryan Randeriya</span>
          <div className="flex gap-2">
            <span className="text-foreground-500 text-xs">
              31st January 2024
            </span>
            <span className="text-foreground text-xs">/</span>
            <span className="text-foreground-400 text-xs">10 minute read</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-semibold text-2xl ">
          Title Lorem ipsum dolor, sit amet consectetur adipisicing.
        </span>
        <span className="text-sm text-foreground-500">
          subtitle Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Eaque, cupiditate!
        </span>
      </div>
    </main>
  );
}
