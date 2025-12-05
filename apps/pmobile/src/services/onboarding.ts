import { STORAGE_PREFIX } from '../lib/constants';
import { LocalStorage, localStorage } from '../lib/storage';

class OnboardingService {
  private readonly onboardingCompletedKey = `${STORAGE_PREFIX}:onboarding_completed`;

  constructor(private readonly storage: LocalStorage) {}

  async getOnboardingCompleted(): Promise<boolean> {
    const value = await this.storage.get(this.onboardingCompletedKey);
    return value === 'true' ? true : value === 'false' ? false : false;
  }

  async setOnboardingCompleted(completed: boolean): Promise<void> {
    await this.storage.set(this.onboardingCompletedKey, completed);
  }

  async deleteOnboardingCompleted(): Promise<void> {
    await this.storage.delete(this.onboardingCompletedKey);
  }
}

export const onboardingService = new OnboardingService(localStorage);
