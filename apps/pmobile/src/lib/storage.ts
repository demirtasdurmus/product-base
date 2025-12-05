import { createMMKV, MMKV } from 'react-native-mmkv';

/**
 * A thin wrapper around the MMKV API.
 */
export class LocalStorage {
  constructor(private readonly storage: MMKV) {}

  get(key: string, as: 'boolean'): boolean | null;
  get(key: string, as: 'string'): string | null;
  get(key: string, as: 'number'): number | null;
  get(key: string, as?: 'string'): string | null;
  get(
    key: string,
    as: 'boolean' | 'string' | 'number' = 'string'
  ): boolean | string | number | null {
    switch (as) {
      case 'boolean':
        return this.getBoolean(key);
      case 'string':
        return this.getString(key);
      case 'number':
        return this.getNumber(key);
      default:
        return null;
    }
  }

  set(key: string, value: boolean | string | number): void {
    try {
      this.storage.set(key, value);
    } catch (error) {
      console.error('error setting item', error);
    }
  }

  private getBoolean(key: string): boolean | null {
    try {
      return this.storage.getBoolean(key) ?? null;
    } catch (error) {
      console.error('error getting item', error);
      return null;
    }
  }

  private getString(key: string): string | null {
    try {
      return this.storage.getString(key) ?? null;
    } catch (error) {
      console.error('error getting item', error);
      return null;
    }
  }

  private getNumber(key: string): number | null {
    try {
      return this.storage.getNumber(key) ?? null;
    } catch (error) {
      console.error('error getting item', error);
      return null;
    }
  }
}

export const localStorage = new LocalStorage(createMMKV());
