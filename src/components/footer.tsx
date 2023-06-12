import Link, { LinkProps } from "next/link";
import Container from "./container";
import { ComponentPropsWithoutRef, FunctionComponent } from "react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-t-[#171717]">
      <Container className="flex flex-row justify-between w-full px-10 py-10">
        <div className="flex flex-col w-full gap-2">
          <h5 className="font-thin text-white uppercase font-xs text-[13px] font-body">
            Navigate
          </h5>
          <nav className="flex flex-col gap-0">
            <FooterLink href={"/"}>Home</FooterLink>
            <FooterLink href={"/about"}>About</FooterLink>
            <FooterLink href={"#"}>Colophon</FooterLink>
          </nav>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h5 className="font-thin text-white uppercase font-xs text-[13px] font-body">
            Contact
          </h5>
          <nav className="flex flex-col gap-0">
            <FooterLink href={"mailto:mail@fransfp.dev"}>Email</FooterLink>
            <FooterLink href={"https://linkedin.com/"}>LinkedIn</FooterLink>
            <FooterLink href={"https://twitter.com/franspotter"}>
              Twitter
            </FooterLink>
            <FooterLink href={"https://github.com/fransfilastap"}>
              Github
            </FooterLink>
          </nav>
        </div>
      </Container>
      <Container className="w-full px-10 py-10 text-xs font-thin text-white">
        &copy; {`${new Date().getFullYear()}`} Frans Filasta Pratama. All Rights
        reserverd.
      </Container>
    </footer>
  );
}

type FooterLinkProps = ComponentPropsWithoutRef<"a"> & LinkProps;
const FooterLink: FunctionComponent<FooterLinkProps> = ({
  href,
  children,
  ...rest
}) => {
  return (
    <Link
      href={href}
      className="text-white text-[13px] font-bold uppercase font-body"
      {...rest}
    >
      {children}
    </Link>
  );
};
