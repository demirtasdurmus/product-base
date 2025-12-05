import { useCallback, useRef, useState } from 'react';
import { router } from 'expo-router';
import {
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingScreen, OnboardingScreenData } from '../components/onboarding-screen';
import { Button } from '../components/ui/button';
import { DotIndicator } from '../components/ui/dot-indicator';
import { Text } from '../components/ui/text';
import { onboardingService } from '../services/onboarding';

export const ONBOARDING_SCREENS: OnboardingScreenData[] = [
  {
    title: 'Welcome to Your Journey',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: require('../../assets/images/onboarding-1.png') as ImageSourcePropType
  },
  {
    title: 'Discover Amazing Features',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../assets/images/onboarding-2.png') as ImageSourcePropType
  },
  {
    title: 'Get Started Today',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: require('../../assets/images/onboarding-3.png') as ImageSourcePropType
  },
  {
    title: 'Join Our Community',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: require('../../assets/images/onboarding-4.webp') as ImageSourcePropType
  }
];

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingScreenData>>(null);

  const handleSkip = useCallback(async () => {
    await onboardingService.setOnboardingCompleted(true);
    router.replace('/');
  }, []);

  const handleNext = useCallback(async () => {
    if (currentIndex < ONBOARDING_SCREENS.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      await onboardingService.setOnboardingCompleted(true);
      router.replace('/');
    }
  }, [currentIndex]);

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);
      setCurrentIndex(index);
    },
    [width]
  );

  const isLastScreen = currentIndex === ONBOARDING_SCREENS.length - 1;

  return (
    <SafeAreaView className="bg-background flex-1" edges={['top', 'bottom']}>
      <View className="flex-1">
        {/* Skip Button */}
        {!isLastScreen && (
          <View className="absolute right-4 top-4 z-10">
            <Button variant="ghost" onPress={handleSkip} className="px-4 py-2">
              <Text className="text-muted-foreground text-sm">Skip</Text>
            </Button>
          </View>
        )}

        {/* Onboarding Screens */}
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_SCREENS}
          renderItem={({ item, index }) => <OnboardingScreen data={item} index={index} />}
          keyExtractor={(_, index) => `onboarding-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index
          })}
          onScrollToIndexFailed={(info) => {
            // Fallback if scroll to index fails
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
        />

        {/* Bottom Section */}
        <SafeAreaView edges={['bottom']} className="bg-background gap-6 px-6 pb-6">
          {/* Pagination Dots */}
          <DotIndicator totalScreens={ONBOARDING_SCREENS.length} currentIndex={currentIndex} />

          {/* CTA Button */}
          <Button onPress={handleNext} className="w-full" size="lg">
            <Text className="font-semibold">{isLastScreen ? 'Sign In' : 'Continue'}</Text>
          </Button>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}
