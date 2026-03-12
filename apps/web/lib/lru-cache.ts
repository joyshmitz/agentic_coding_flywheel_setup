/**
 * LRU (Least Recently Used) Cache Implementation
 *
 * Efficient memory-bounded cache that evicts least recently used items
 * when capacity is exceeded. Useful for caching expensive computations.
 *
 * Time Complexity:
 * - get/set: O(1)
 * - delete: O(1)
 *
 * Space Complexity: O(n) where n = maxSize
 */

export interface CacheStats {
  size: number;
  maxSize: number;
  hits: number;
  misses: number;
  hitRate: number;
}

export class LRUCache<K, V> {
  private map: Map<K, V> = new Map();
  private maxSize: number;
  private hits: number = 0;
  private misses: number = 0;

  constructor(maxSize: number = 100) {
    if (maxSize <= 0) {
      throw new Error('maxSize must be greater than 0');
    }
    this.maxSize = maxSize;
  }

  /**
   * Get a value from cache
   * Marks the key as recently used (moves to end)
   */
  get(key: K): V | undefined {
    if (this.map.has(key)) {
      this.hits++;
      // Move to end (most recently used)
      const value = this.map.get(key)!;
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    }
    this.misses++;
    return undefined;
  }

  /**
   * Set a value in cache
   * Evicts LRU item if cache is at capacity
   */
  set(key: K, value: V): void {
    // If key already exists, delete it first so it moves to end
    if (this.map.has(key)) {
      this.map.delete(key);
    }

    // If at capacity, delete the least recently used (first) item
    if (this.map.size >= this.maxSize && !this.map.has(key)) {
      const firstKey = this.map.keys().next().value as K;
      this.map.delete(firstKey);
    }

    // Add new/updated key to end (most recently used)
    this.map.set(key, value);
  }

  /**
   * Check if key exists without updating recency
   */
  has(key: K): boolean {
    return this.map.has(key);
  }

  /**
   * Delete a specific key
   */
  delete(key: K): boolean {
    return this.map.delete(key);
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.map.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Get current cache statistics
   */
  getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      size: this.map.size,
      maxSize: this.maxSize,
      hits: this.hits,
      misses: this.misses,
      hitRate: total === 0 ? 0 : this.hits / total,
    };
  }

  /**
   * Resize cache (evicts LRU items if new size is smaller)
   */
  resize(newMaxSize: number): void {
    if (newMaxSize <= 0) {
      throw new Error('newMaxSize must be greater than 0');
    }
    this.maxSize = newMaxSize;

    // Evict excess items if needed
    while (this.map.size > this.maxSize) {
      const firstKey = this.map.keys().next().value as K;
      this.map.delete(firstKey);
    }
  }

  /**
   * Get current size
   */
  get size(): number {
    return this.map.size;
  }
}
