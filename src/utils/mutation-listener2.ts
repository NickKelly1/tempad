import { mergeMap, map, Observable, Subject, filter } from 'rxjs';
import { isElement } from './is-element';

export class MutationListener {
  protected isListening: boolean = false;
  protected readonly root: MutationObserver;
  protected readonly subject: Subject<MutationRecord[]>;
  protected readonly records: Observable<MutationRecord>;
  protected readonly additions: Observable<Node>;
  protected readonly removals: Observable<Node>;

  constructor(protected readonly selector: string) {
    this.subject = new Subject<MutationRecord[]>();
    this.root = new MutationObserver(this.handleMutation.bind(this));
    this.records = this.subject.pipe(mergeMap(records => records));
    this.additions = this.records.pipe(mergeMap(record => record.addedNodes));
    this.removals = this.records.pipe(mergeMap(record => record.removedNodes));
  }

  protected handleMutation(entries: MutationRecord[], o: MutationObserver) {
    this.subject.next(entries);
  }

  /**
   * Observable of element additions
   *
   * @param selector
   * @returns
   */
  onAdd$(selector: string): Observable<HTMLElement> {
    const add$ = this.additions.pipe(
      filter((node): node is HTMLElement => isElement(node)),
      map((elem) => elem.querySelector(selector)),
      filter((elem): elem is HTMLElement => !!elem)
    );
    return add$;
  }

  listen(): boolean {
    if (this.isListening) return false;
    this.root.observe(document.querySelector(this.selector)!, { childList: true, });
    this.isListening = true;
    return true;
  }

  /**
   * Observable of element removals
   *
   * @param selector
   * @returns
   */
  onRemove$(selector: string): Observable<Node> {
    const remove$ = this.removals.pipe(
      filter((node): node is HTMLElement => isElement(node)),
      map((elem) => elem.querySelector(selector)),
      filter((elem): elem is HTMLElement => !!elem)
    );
    return remove$;
  }
}
