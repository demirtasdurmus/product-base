import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

/**
 * A thin wrapper around the AsyncStorage API.
 * We can update the underlying storage mechanism later with react-native-mmkv later
 * but for now, we'll use AsyncStorage because mmkv is not supported in Expo Go.
 */
export class LocalStorage {
  constructor(private readonly storage: AsyncStorageStatic) {}

  async get(key: string): Promise<string | null> {
    try {
      return await this.storage.getItem(key);
    } catch (error) {
      console.error('error getting item', error);
      return null;
    }
  }

  async set(key: string, value: boolean | string | number): Promise<void> {
    try {
      await this.storage.setItem(key, String(value));
    } catch (error) {
      console.error('error setting item', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.storage.removeItem(key);
    } catch (error) {
      console.error('error deleting item', error);
    }
  }
}

export const localStorage = new LocalStorage(AsyncStorage);
