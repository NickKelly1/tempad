export interface Noop { (): void }
export interface AnyFn { (...args: any[]): any }
export interface Page<O, C> {
  id: string;
  open(this: unknown, props: O): Promise<void>;
  close(this: unknown, props: C): Promise<void>;
}