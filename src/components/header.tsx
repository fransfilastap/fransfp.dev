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
import { CommandMenu } from '@/components/command'

export default function Header() {
  return (
    <header className="py-4 bg-background border-b border-b-slate-50 dark:border-b-slate-800">
      <div className="flex justify-between xcontainer">
        <Logo />
        <Navigation className="hidden md:flex" />
        <div className="flex flex-row">
          <CommandMenu/>
          <ModeToggle />
        </div>
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
