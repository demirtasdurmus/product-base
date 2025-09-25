import { Link, router } from 'expo-router';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function About() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-1 items-center justify-center p-5">
          <Text className="mb-4 text-3xl font-bold text-gray-800">About Page</Text>
          <Text className="mb-10 text-center text-lg text-gray-600">
            This demonstrates Expo Router navigation!
          </Text>

          <View className="flex w-full flex-col gap-4">
            <Link href="/" asChild>
              <TouchableOpacity className="items-center rounded-lg bg-slate-700 px-6 py-4">
                <Text className="text-base font-medium text-white">Go Home (Link Component)</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              className="items-center rounded-lg bg-blue-600 px-6 py-4"
              onPress={() => router.push('/')}
            >
              <Text className="text-base font-medium text-white">Go Home (Router Push)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center rounded-lg bg-emerald-600 px-6 py-4"
              onPress={() => router.back()}
            >
              <Text className="text-base font-medium text-white">Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
