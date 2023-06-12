"use client";

import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { motion, MotionProps } from "framer-motion";

type MobileMenuButtonProps = MotionProps & ComponentPropsWithoutRef<"button">;

const MobileMenuButton: FunctionComponent<MobileMenuButtonProps> = (props) => {
  return (
    <motion.button
      className="block text-black appearance-none lg:hidden"
      aria-label="menu button"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
    </motion.button>
  );
};

export default MobileMenuButton;
