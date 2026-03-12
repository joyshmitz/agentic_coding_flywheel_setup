import { describe, it, expect } from 'bun:test';
import { LRUCache } from '../lru-cache';

describe('LRUCache', () => {
  describe('basic operations', () => {
    it('stores and retrieves values', () => {
      const cache = new LRUCache<string, string>(10);
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');
    });

    it('returns undefined for missing keys', () => {
      const cache = new LRUCache<string, string>(10);
      expect(cache.get('missing')).toBeUndefined();
    });

    it('updates existing values', () => {
      const cache = new LRUCache<string, string>(10);
      cache.set('key1', 'value1');
      cache.set('key1', 'value2');
      expect(cache.get('key1')).toBe('value2');
      expect(cache.size).toBe(1);
    });

    it('checks existence without updating recency', () => {
      const cache = new LRUCache<string, string>(2);
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');

      // Check existence
      expect(cache.has('key1')).toBe(true);

      // Add new item (should evict key1, not key2)
      cache.set('key3', 'value3');
      expect(cache.has('key1')).toBe(false);
      expect(cache.has('key2')).toBe(true);
    });

    it('deletes keys', () => {
      const cache = new LRUCache<string, string>(10);
      cache.set('key1', 'value1');
      expect(cache.delete('key1')).toBe(true);
      expect(cache.get('key1')).toBeUndefined();
      expect(cache.delete('key1')).toBe(false);
    });

    it('clears all entries', () => {
      const cache = new LRUCache<string, string>(10);
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.clear();
      expect(cache.size).toBe(0);
      expect(cache.get('key1')).toBeUndefined();
    });
  });

  describe('LRU eviction', () => {
    it('evicts least recently used item when at capacity', () => {
      const cache = new LRUCache<string, string>(2);
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3'); // Should evict key1

      expect(cache.has('key1')).toBe(false);
      expect(cache.has('key2')).toBe(true);
      expect(cache.has('key3')).toBe(true);
    });

    it('updates recency on get', () => {
      const cache = new LRUCache<string, string>(2);
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.get('key1'); // Mark key1 as recently used
      cache.set('key3', 'value3'); // Should evict key2, not key1

      expect(cache.has('key1')).toBe(true);
      expect(cache.has('key2')).toBe(false);
      expect(cache.has('key3')).toBe(true);
    });

    it('updates recency on set', () => {
      const cache = new LRUCache<string, string>(2);
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key1', 'updated'); // Re-set key1
      cache.set('key3', 'value3'); // Should evict key2, not key1

      expect(cache.has('key1')).toBe(true);
      expect(cache.has('key2')).toBe(false);
      expect(cache.has('key3')).toBe(true);
    });

    it('handles single-size cache', () => {
      const cache = new LRUCache<string, string>(1);
      cache.set('key1', 'value1');
      expect(cache.size).toBe(1);
      cache.set('key2', 'value2');
      expect(cache.size).toBe(1);
      expect(cache.has('key1')).toBe(false);
      expect(cache.has('key2')).toBe(true);
    });
  });

  describe('statistics', () => {
    it('tracks cache hits and misses', () => {
      const cache = new LRUCache<string, string>(10);
      cache.set('key1', 'value1');

      cache.get('key1'); // Hit
      cache.get('key1'); // Hit
      cache.get('missing'); // Miss
      cache.get('missing'); // Miss

      const stats = cache.getStats();
      expect(stats.hits).toBe(2);
      expect(stats.misses).toBe(2);
    });

    it('calculates hit rate', () => {
      const cache = new LRUCache<string, string>(10);
      cache.set('key1', 'value1');

      cache.get('key1'); // Hit
      cache.get('key1'); // Hit
      cache.get('missing'); // Miss

      const stats = cache.getStats();
      expect(stats.hitRate).toBe(2 / 3);
    });

    it('reports 0 hit rate when empty', () => {
      const cache = new LRUCache<string, string>(10);
      const stats = cache.getStats();
      expect(stats.hitRate).toBe(0);
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
    });

    it('returns complete stats', () => {
      const cache = new LRUCache<string, string>(5);
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');

      const stats = cache.getStats();
      expect(stats.size).toBe(2);
      expect(stats.maxSize).toBe(5);
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
    });

    it('resets stats on clear', () => {
      const cache = new LRUCache<string, string>(10);
      cache.set('key1', 'value1');
      cache.get('key1'); // Hit
      cache.get('missing'); // Miss

      cache.clear();
      const stats = cache.getStats();
      expect(stats.size).toBe(0);
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
    });
  });

  describe('resize', () => {
    it('increases cache size', () => {
      const cache = new LRUCache<string, string>(2);
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');

      cache.resize(5);
      cache.set('key3', 'value3');

      expect(cache.size).toBe(3);
      expect(cache.has('key1')).toBe(true);
      expect(cache.has('key2')).toBe(true);
    });

    it('decreases cache size with eviction', () => {
      const cache = new LRUCache<string, string>(5);
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3');

      cache.resize(2); // Should evict key1 (LRU)

      expect(cache.size).toBe(2);
      expect(cache.has('key1')).toBe(false);
      expect(cache.has('key2')).toBe(true);
      expect(cache.has('key3')).toBe(true);
    });

    it('throws on invalid size', () => {
      const cache = new LRUCache<string, string>(10);
      expect(() => cache.resize(0)).toThrow();
      expect(() => cache.resize(-5)).toThrow();
    });
  });

  describe('constructor', () => {
    it('accepts custom max size', () => {
      const cache = new LRUCache<string, string>(50);
      const stats = cache.getStats();
      expect(stats.maxSize).toBe(50);
    });

    it('throws on invalid max size', () => {
      expect(() => new LRUCache<string, string>(0)).toThrow();
      expect(() => new LRUCache<string, string>(-10)).toThrow();
    });

    it('defaults to size 100', () => {
      const cache = new LRUCache<string, string>();
      const stats = cache.getStats();
      expect(stats.maxSize).toBe(100);
    });
  });

  describe('type safety', () => {
    it('works with string keys and values', () => {
      const cache = new LRUCache<string, string>(10);
      cache.set('key', 'value');
      expect(cache.get('key')).toBe('value');
    });

    it('works with number keys', () => {
      const cache = new LRUCache<number, string>(10);
      cache.set(1, 'value1');
      expect(cache.get(1)).toBe('value1');
    });

    it('works with complex values', () => {
      interface CacheValue {
        data: string;
        timestamp: number;
      }
      const cache = new LRUCache<string, CacheValue>(10);
      const value = { data: 'test', timestamp: Date.now() };
      cache.set('key1', value);
      expect(cache.get('key1')).toEqual(value);
    });
  });

  describe('performance', () => {
    it('handles many items efficiently', () => {
      const cache = new LRUCache<number, string>(1000);

      // Add 1000 items
      for (let i = 0; i < 1000; i++) {
        cache.set(i, `value-${i}`);
      }
      expect(cache.size).toBe(1000);

      // Access first item (evicts it)
      cache.set(1000, 'value-1000');
      expect(cache.has(0)).toBe(false);
      expect(cache.has(1000)).toBe(true);
    });

    it('maintains LRU order with many accesses', () => {
      const cache = new LRUCache<number, string>(3);
      cache.set(1, 'a');
      cache.set(2, 'b');
      cache.set(3, 'c');

      // Access in pattern: 1, 2, 1, 2, 1
      cache.get(1);
      cache.get(2);
      cache.get(1);
      cache.get(2);
      cache.get(1);

      // Add new item - should evict 3 (never accessed after initial set)
      cache.set(4, 'd');

      expect(cache.has(1)).toBe(true);
      expect(cache.has(2)).toBe(true);
      expect(cache.has(3)).toBe(false);
      expect(cache.has(4)).toBe(true);
    });
  });
});
