/* eslint-disable jsx-a11y/accessible-emoji */
import { Link } from 'expo-router';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="flex-1 justify-between p-6">
          <View className="mt-16 items-center">
            <Text className="mb-2 text-2xl text-slate-600">Welcome to</Text>
            <Text className="mb-2 text-5xl font-bold text-slate-900">PMobile 🚀</Text>
            <Text className="text-lg font-medium text-slate-600">
              Built with Expo Router & NativeWind
            </Text>
          </View>

          <View className="flex-1 items-center justify-center">
            <View className="mb-10 flex-row items-center rounded-xl bg-green-100 px-4 py-3">
              <Text className="mr-3 text-xl">✅</Text>
              <Text className="text-lg font-semibold text-green-800">
                Expo Router + NativeWind working!
              </Text>
            </View>

            <View className="w-full items-center">
              <Text className="mb-6 text-xl font-semibold text-slate-700">Try Navigation</Text>

              <Link href="/about" asChild>
                <TouchableOpacity className="mb-4 w-full max-w-xs rounded-xl bg-blue-500 px-8 py-4">
                  <Text className="text-center text-lg font-semibold text-white">
                    Go to About Page
                  </Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity className="w-full max-w-xs rounded-xl border-2 border-slate-300 px-8 py-4">
                <Text className="text-center text-lg font-semibold text-slate-600">Stay Here</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="items-center pb-5">
            <Text className="text-center text-sm text-slate-400">
              File-based routing • TypeScript • React Native • NativeWind
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
