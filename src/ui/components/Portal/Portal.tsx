import { PropsWithChildren, ReactPortal, useEffect, useRef, useState } from "react";
import { PortalProps } from "./Portal.types";
import ReactDOM from 'react-dom';

function canUseDom (): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.document) return false;
  if (!window.document.getElementById) return false;
  return true;
}

export const Portal = (props: PropsWithChildren<PortalProps>): null | ReactPortal => {
  const { children, selector } = props;

  // const [renderable, setRenderable] = useState(() => canUseDom());

  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted]  = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector ?? '#modal-root') ;
    setMounted(true);
  }, [selector]);

  if (!mounted || !ref.current) return null;
  const portal = ReactDOM.createPortal(
    children,
    ref.current,
  );
  return portal;
}

Portal.displayName = 'Portal';