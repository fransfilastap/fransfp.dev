import Link, { LinkProps } from "next/link";
import { ClassNameValue } from "tailwind-merge";

export default function Logo() {
  return (
    <Link href={"/"} className="inline-block text-xl font-extrabold">
      FFP.
    </Link>
  );
}
