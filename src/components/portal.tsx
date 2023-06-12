import { useIsomorphicLayoutEffect } from "@/hooks";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  id: string;
}
const Portal: FunctionComponent<PropsWithChildren<PortalProps>> = ({
  children,
  id = "portal",
}: PropsWithChildren<PortalProps>) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useIsomorphicLayoutEffect(() => {
    let element = document.getElementById(id);
    let created = false;

    if (!element) {
      element = createWrapper(id);
      created = true;
    }

    setWrapperElement(element);

    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [id]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement as Element);
};

export default Portal;

export function createWrapper(id: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", id);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
