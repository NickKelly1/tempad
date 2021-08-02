import { Observable } from './observable';

export type ResizeHandler = ResizeObserverCallback;
export interface RemoveListener { (): void; }

export class ResizeListener extends Observable<[entries: ResizeObserverEntry[], observer: ResizeObserver]> {
  protected readonly observer: ResizeObserver; 
  protected readonly element: HTMLElement;

  constructor(protected readonly selector: string | HTMLElement) {
    super();
    if (typeof selector === 'string') {
      this.element = document.querySelector(selector)!;
    } else {
      this.element = selector;
    }
    this.observer = new ResizeObserver(this.handleResize.bind(this));
    this.observer.observe(this.element);
  }

  /**
   * Handle resize event
   *
   * @param entries
   * @param observer
   */
  handleResize(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    this.fire(entries, observer);
  }

  /**
   * Destruct the observer registry
   */
  public destruct(): void {
    this.observer.disconnect();
    super.removeListeners();
  }
}