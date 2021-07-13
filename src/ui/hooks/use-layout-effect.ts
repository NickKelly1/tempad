import React from "react";


// https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
// isomorphic use-layout-effect
// use-layout-effect cannot be used in SSR, for SSR
// we call useEffect instead
// we keep the name "useLayoutEffect" so eslint still helps us
export const useLayoutEffect: typeof React.useLayoutEffect =
  typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;