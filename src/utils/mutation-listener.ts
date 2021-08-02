// import { Observable } from "./observable";

// export class MutationListener extends Observable<[mutations: MutationRecord[], observer: MutationObserver]> {
//   protected readonly element: Element;
//   protected readonly observer: MutationObserver;

//   constructor(selector: string | Element) {
//     super();
//     if (typeof selector === 'string') {
//       this.element = document.querySelector(selector)!;
//     } else {
//       this.element = selector;
//     }
//     this.observer = new MutationObserver(this.onMutation.bind(this));
//     this.observer.observe(this.element, {
//       childList: true,
//       characterData: true,
//       attributeOldValue: true,
//       subtree: true,
//     });
//   }

//   onMutation(mutations: MutationRecord[], observer: MutationObserver) {
//     this.fire(mutations, observer);
//   }
// }
export {}