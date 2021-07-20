import { Registry } from "./registry";

export interface Observer<T extends any[]> { (...args: T): void };
export interface RemoveListener { (): void; }

export class Observable<T extends any[]> {
  protected readonly registry = new Registry<Observer<T>, Observer<T>>();

  /**
   * Handle resize event
   *
   * @param entries
   * @param observer
   */
  fire(...args: T) {
    // use iterators directly in-case listners remove themselves/other listeners
    // (don't want to cache everything into an array if it intends to be removed)
    for (const listeners of this.registry.values()) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }


  /**
   * Removeall listeners
   */
  public removeListeners(): void {
    this.registry.deleteAll();
  }


  /**
   * Destruct the observer registry
   */
  public destruct(): void {
    this.removeListeners();
  }


  /**
   * Add an event listener that removes itself after firing
   *
   * @param listener
   * @returns
   */
  once(listener: Observer<T>): RemoveListener {
    const self = this;

    function removeListener() {
      self.registry.delete(listener, once);
    }

    // create a new function reference so it can be targetted
    // for removal without removing all instances of the argument
    const once: Observer<T> = function once(...args) {
      listener(...args);
      removeListener();
    }

    self.registry.add(listener, once);

    return removeListener;
  }

  /**
   * Add an event listener
   *
   * @param listener
   * @returns
   */
  on(listener: Observer<T>): RemoveListener {
    const self = this;

    function removeListener() {
      self.registry.delete(listener, on);
    };

    // create a new function reference so it can be targetted
    // for removal without removing all instances of the argument
    const on: Observer<T> = function on(...args) {
      listener(...args);
    }

    self.registry.add(listener, on);

    return removeListener;
  }

  /**
   * Removes all listeners matching the reference
   *
   * @param listener
   */
  off(listener: Observer<T>): void {
    this.registry.delete(listener);
  }
}