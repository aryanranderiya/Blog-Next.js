import { Input } from "@nextui-org/react";
import { Search01Icon } from "@/components/icons";

export default function Navbar() {
  return (
    <div className="w-screen p-[1em] px-[1.5em] flex justify-between items-center">
      <div className="font-bold flex items-center gap-3">
        <img
          src="https://github.com/aryanranderiya.png"
          alt="Blog Logo"
          className="w-[30px]"
        />
        Aryan's Blog
      </div>

      <div className="flex gap-5 items-center">
        <Input
          size="sm"
          className="dark"
          placeholder="Search"
          radius="full"
          startContent={
            <Search01Icon color="white" width={"20"} className="mr-2" />
          }
        />
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>MENU</span>
      </div>
    </div>
  );
}
