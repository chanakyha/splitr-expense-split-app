import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { MenuIcon, SunMoon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const { setTheme, theme } = useTheme();
  const [themeChecked, setThemeChecked] = useState(theme);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="p-2 flex border-b items-center justify-between">
      <Link href={"/"}>
        <Image
          className="w-10 h-10 dark:invert"
          height={1000}
          width={1000}
          alt="logo"
          src={Logo}
        />
      </Link>
      <h1 className="font-medium text-lg uppercase tracking-widest">Splitr</h1>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MenuIcon className="w-8 h-8 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-3">
            <DropdownMenuRadioGroup value={"bottom"}>
              <DropdownMenuLabel className="flex items-center gap-3">
                <Image
                  width={1000}
                  height={1000}
                  className="w-10 h-10 rounded-full"
                  alt="profile-image"
                  src={session?.user?.image!}
                />
                <div className="flex flex-col -space-y-1">
                  <p className="font-bold">{session?.user?.name}</p>
                  <p className="text-[0.5rem] font-light text-white/50">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/profile"}>
                <DropdownMenuItem>Your Profile</DropdownMenuItem>
              </Link>
              <Link href={"/trips"}>
                <DropdownMenuItem>View Trips</DropdownMenuItem>
              </Link>
              <Link href={"/add-trip"}>
                <DropdownMenuItem>Add Trip</DropdownMenuItem>
              </Link>
              <Link href={"/pending"}>
                <DropdownMenuItem>Due Pending</DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />

              <div className="flex text-sm capitalize items-center px-2 py-1.5 w-full justify-between">
                <p className="font-bold">
                  Theme: <span className="font-light">{themeChecked}</span>
                </p>
                <Switch
                  checked={themeChecked === "dark"}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTheme("dark");
                      setThemeChecked("dark");
                    } else {
                      setTheme("light");
                      setThemeChecked("light");
                    }
                  }}
                />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                  router.push("/login");
                }}
                className="text-red-600 font-medium cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <SunMoon
            onClick={() => {
              if (theme === "light") {
                setTheme("dark");
                setThemeChecked("dark");
              } else {
                setTheme("light");
                setThemeChecked("light");
              }
            }}
            className="w-6 h-6"
          />
        </>
      )}
    </div>
  );
};

export default Header;
