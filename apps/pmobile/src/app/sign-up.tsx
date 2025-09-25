import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, Image, KeyboardAvoidingView, View } from 'react-native';
import { Button } from '../components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '../components/card';
import { Input } from '../components/input';
import { Text } from '../components/text';
import { authClient } from '../lib/auth-client';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  return (
    <Card className="z-50 mx-6">
      <CardHeader className="flex items-center justify-center gap-8">
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 40,
            height: 40
          }}
        />
        <CardTitle>Create new Account</CardTitle>
      </CardHeader>
      <View className="px-6">
        <KeyboardAvoidingView>
          <Input
            placeholder="Name"
            className="rounded-b-none border-b-0"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
          <Input
            placeholder="Email"
            className="rounded-b-none border-b-0"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoCapitalize="none"
          />
        </KeyboardAvoidingView>

        <KeyboardAvoidingView>
          <Input
            placeholder="Password"
            secureTextEntry
            className="rounded-t-none"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </KeyboardAvoidingView>
      </View>
      <CardFooter>
        <View className="mt-2 w-full">
          <Button
            onPress={async () => {
              const res = await authClient.signUp.email(
                {
                  email,
                  password,
                  name
                },
                {
                  onError: (ctx) => {
                    Alert.alert(ctx.error.message);
                  },
                  onSuccess: (ctx) => {
                    router.push('/dashboard');
                  }
                }
              );
              console.log(res);
            }}
          >
            <Text>Sign Up</Text>
          </Button>
          <Text className="mt-2 text-center">
            Already have an account?{' '}
            <Text
              className="underline"
              onPress={() => {
                router.push('/');
              }}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </CardFooter>
    </Card>
  );
}
