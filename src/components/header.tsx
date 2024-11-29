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
    <header className="sticky top-0 py-2.5 bg-background border-b border-b-primary/10 z-10">
      <div className="flex xcontainer">
        <Navigation />
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
              ~/home/ffilasta
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/about"} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              /etc/about
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
