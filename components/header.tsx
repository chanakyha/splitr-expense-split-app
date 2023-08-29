import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { MenuIcon } from "lucide-react";
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

const Header = () => {
  const { setTheme, theme } = useTheme();
  const [themeChecked, setThemeChecked] = useState(theme);
  const { data: session } = useSession();
  const router = useRouter();
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MenuIcon className="w-8 h-8 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-3">
          <DropdownMenuLabel>
            Hello {session ? String(session?.user?.name).split(" ")[0] : "User"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={"bottom"}>
            {session ? (
              <>
                <DropdownMenuItem>Your Profile</DropdownMenuItem>
                <DropdownMenuItem>View Trips</DropdownMenuItem>
                <DropdownMenuItem>Add Trip</DropdownMenuItem>
                <DropdownMenuItem>Due Pending</DropdownMenuItem>
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
              </>
            ) : (
              <DropdownMenuItem>Login</DropdownMenuItem>
            )}

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
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
