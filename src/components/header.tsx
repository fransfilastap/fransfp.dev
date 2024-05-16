"use client";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuProps,
} from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import Logo from "./logo";
import ModeToggle from "./mode-toggle";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="sticky top-0 py-4 border-b border-b-slate-50 dark:border-b-slate-800 bg-background">
      <div className="flex justify-between xcontainer">
        <Logo />
        <Navigation className="hidden md:flex" />
        <ModeToggle />
      </div>
    </header>
  );
}

function Navigation(props: NavigationMenuProps) {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={"/"} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/blog"} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Posts
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/about"} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
