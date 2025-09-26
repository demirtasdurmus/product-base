import '../global.css';

import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center">
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
