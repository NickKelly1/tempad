/**
 * Key-value store
 *
 * Allows multiple values to be mapped to a single key
 */
export class Registry<K, V> {
  private data: Map<K, V[]> = new Map();

  /**
   * Add a key-value pair
   *
   * @param key
   * @param value
   */
  add(key: K, value: V) {
    const existing = this.data.get(key);
    if (existing) existing.push(value);
    else this.data.set(key, [value]);
  }

  /**
   * Delete a key-value pair
   *
   * @param key
   * @param value
   */
  delete(key: K, value?: V) {
    if (!value) this.data.delete(key);
    else {
      const prev = this.data.get(key);
      if (!prev) return;
      const index = prev.indexOf(value);
      if (index !== -1) prev.splice(index, 1);
      if (prev.length === 0) this.data.delete(key);
    }
  }

  /**
   * Delete everything from the registry
   */
  deleteAll() {
    for (const key of this.data.keys()) {
      this.data.delete(key);
    }
  }

  /**
   * Values of the registry
   *
   * @returns
   */
  values(): IterableIterator<V[]> {
    return this.data.values();
  }

  /**
   * Keys of the registry
   *
   * @returns
   */
  keys(): IterableIterator<K> {
    return this.data.keys();
  }

  /**
   * Entries of the registry
   *
   * @returns
   */
  entries(): IterableIterator<[K, V[]]> {
    return this.data.entries();
  }
}