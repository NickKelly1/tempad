/**
 * Deep-copy an object
 */
export function deepCopy<T>(obj: T, path = 'root'): T {
  switch (typeof obj) {
    case 'bigint':
    case 'boolean':
    case 'string':
    case 'symbol':
    case 'undefined':
      return obj;

    case 'function':
      throw new Error('Cannot deep-clone functions');

    case 'object':
      // check null if (obj === null) return obj;

      const proto = Object.getPrototypeOf(obj);

      switch (proto) {
        // plain object
        case null: 
        case Object.prototype:  {
          // deep-cloen all keys
          const next: any = {};
          Object.keys(obj).forEach(key => {
            next[key] = deepCopy(next[key] as any, `${path}.${key}`);
          });
          return next as unknown as T;
        }

        // set - deep copy values
        case Set.prototype: {
          const next = new Set(Array
            .from((obj as unknown as Set<any>)
            .values())
            .map((v) => deepCopy(v)));
          return next as unknown as T;
        }

        // map - deep copy values
        case Map.prototype: {
          const next = new Map(Array
            .from((obj as unknown as Map<any, any>)
            .entries())
            .map(([k, v]) => [k, deepCopy(v)]));
          return next as unknown as T;
        }

        case Date.prototype: {
          const next = new Date(obj as unknown as Date);
          return next as unknown as T;
        }

        default: throw new TypeError(`Failed to clone unknown object ${(obj as any).constructor.name}`);
      }

    default: throw new TypeError(`Unhandled type ${typeof obj}`);
  }
}