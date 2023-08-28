import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="p-2 flex border-b items-center justify-between">
      <Image
        className="w-10 h-10"
        height={1000}
        width={1000}
        alt="logo"
        src={Logo}
      />
      <h1 className="font-medium text-lg uppercase tracking-widest">Splitr</h1>
      <MenuIcon className="w-8 h-8" />
    </div>
  );
};

export default Header;
