"use client";

import clsx from "clsx";
import Link from "next/link";
import Logo from "./logo";
import MobileMenuButton from "./mobile-menu-button";
import { useGlobalState } from "@/store";
import { useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import Portal from "./portal";
import { useRouter } from "next/navigation";
import clsxm from "@/helpers/clsxm";

export default function Navigation() {
  const { toggleMenu, menuOpen } = useGlobalState();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenuHandler = () => {
    toggleMenu(false);
  };

  useOnClickOutside(menuRef, closeMenuHandler);

  return (
    <>
      <header
        className={clsx(
          "bg-white/30 backdrop-blur-md rounded-xl flex flex-row justify-between items-center sticky top-4 px-8 py-4 w-[90%] lg:w-[1107px] mx-auto z-40"
        )}
      >
        <Logo />
        <nav className="hidden gap-8 lg:inline-flex">
          <NavigationMenuItem url="/">Home</NavigationMenuItem>
          <NavigationMenuItem url="/blog">Blog</NavigationMenuItem>
          <NavigationMenuItem url="/about">About</NavigationMenuItem>
        </nav>
        <MobileMenuButton
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleMenu()}
        />
      </header>
      <AnimatePresence>
        <Portal id="menu-container-wrapper">
          {menuOpen && (
            <>
              <motion.div
                onClick={closeMenuHandler}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 w-full h-[100vh] z-10 "
              ></motion.div>

              <motion.div className="fixed inset-0 z-20 flex flex-col items-center justify-start p-4 top-[60px]">
                <motion.div
                  ref={menuRef}
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  exit={{ y: -50 }}
                  transition={{ type: "spring", stiffness: 75, delay: 0.04 }}
                  className="flex flex-col w-full gap-2 p-4 rounded-md shadow-slate-400 bg-white/30 backdrop-blur-md"
                >
                  <nav className="flex flex-col items-end gap-2">
                    <MobileNavigationMenuItem url="/">
                      Home
                    </MobileNavigationMenuItem>
                    <MobileNavigationMenuItem url="/blog">
                      Blog
                    </MobileNavigationMenuItem>
                    <MobileNavigationMenuItem url="/about">
                      About
                    </MobileNavigationMenuItem>
                  </nav>
                </motion.div>
              </motion.div>
            </>
          )}
        </Portal>
      </AnimatePresence>
    </>
  );
}

function NavigationMenuItem({
  url,
  children,
}: {
  url: string;
  children: string;
}) {
  return (
    <Link
      href={url}
      className={
        "text-black font-display hover:text-[#5941A9] transition-colors duration-100 ease-in uppercase text-sm font-[500]"
      }
    >
      {children}
    </Link>
  );
}

function MobileNavigationMenuItem({
  url,
  children,
  className,
}: {
  url: string;
  children: string;
  className?: string;
}) {
  const router = useRouter();
  const { toggleMenu, menuOpen } = useGlobalState();

  const clickHandler = () => {
    toggleMenu(false);
    router.push(url);
  };

  return (
    <span
      onClick={clickHandler}
      className={clsxm(
        "text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75% uppercase text-xl font-[500]",
        className
      )}
    >
      {children}
    </span>
  );
}
