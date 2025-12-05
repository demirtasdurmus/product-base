import { STORAGE_PREFIX } from '../lib/constants';
import { LocalStorage, localStorage } from '../lib/storage';

class OnboardingService {
  private readonly onboardingCompletedKey = `${STORAGE_PREFIX}:onboarding_completed`;

  constructor(private readonly storage: LocalStorage) {}

  getOnboardingCompleted(): boolean {
    const value = this.storage.get(this.onboardingCompletedKey, 'boolean');
    return value ?? false;
  }

  setOnboardingCompleted(completed: boolean): void {
    this.storage.set(this.onboardingCompletedKey, completed);
  }
}

export const onboardingService = new OnboardingService(localStorage);
