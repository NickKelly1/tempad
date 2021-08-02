import { Noop } from "../types";

/**
 * Simple queue
 */
export class Queue<V> {
  private queued: Noop[] = [];

  /**
   * Enqueue a function
   *
   * @param fn
   */
  enqueue(fn: Noop) { this.queued.push(fn); }

  /**
   * Run all functions in the queue
   */
  flush() {
    this.queued.forEach(queued => queued());
    this.queued.splice(0, this.queued.length);
  }
}