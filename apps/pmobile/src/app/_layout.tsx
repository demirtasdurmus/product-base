import '../global.css';

import { useEffect, useState } from 'react';
import { Slot, usePathname, useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { onboardingService } from '../services/onboarding';

export default function RootLayout() {
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await onboardingService.getOnboardingCompleted();

      setIsCheckingOnboarding(false);

      if (!completed && pathname !== '/onboarding') {
        router.replace('/onboarding');
      }
    };

    checkOnboarding();
  }, [pathname, router]);

  if (isCheckingOnboarding) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="bg-background flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center">
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
