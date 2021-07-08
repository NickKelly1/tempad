import * as rt from '@reduxjs/toolkit';

// TODO: does this do anything.?
declare module '@reduxjs/toolkit' {
  // interface BaseActionCreator<P, T extends string, M = never, E = never> {
  //   type: T;
  //   _q: T;
  //   match(action: Action<unknown>): action is PayloadAction<P, T, M, E>;
  // }
}

// TODO: does this do anything.?
declare module '*.svg' {
  const content: JSX.Element;
  export default content;
}