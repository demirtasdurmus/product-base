import { useEffect, useState } from 'react';
import { Redirect, router, useNavigationContainerRef } from 'expo-router';
import { ActivityIndicator, Alert, Image, View } from 'react-native';
import { Button } from '../components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/card';
import { Checkbox } from '../components/checkbox';
import { Input } from '../components/input';
import { Text } from '../components/text';
import { authClient } from '../lib/auth-client';

export default function Index() {
  const { data: isAuthenticated, isPending } = authClient.useSession();
  const navContainerRef = useNavigationContainerRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    authClient.signIn.email(
      {
        email,
        password,
        rememberMe
      },
      {
        onError: (ctx) => {
          Alert.alert(ctx.error.message);
        }
      }
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (navContainerRef.isReady()) {
        router.push('/dashboard');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navContainerRef.isReady()]);

  if (isPending) {
    return <ActivityIndicator />;
  }
  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <Card className="bg-secondary z-50 mx-6 backdrop-blur-lg">
      <CardHeader className="flex items-center justify-center gap-8">
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 40,
            height: 40
          }}
        />
        <CardTitle>Sign In to your account</CardTitle>
      </CardHeader>

      <CardContent className="gap-2 px-6">
        <View>
          <Input
            placeholder="Email Address"
            className="rounded-b-none border-b-0"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <Input
            placeholder="Password"
            className="rounded-t-none"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>

        <View className="flex-row items-center gap-2">
          <Checkbox
            checked={rememberMe}
            onCheckedChange={() => {
              setRememberMe(!rememberMe);
            }}
          />
          <Text>Remember me</Text>
        </View>
      </CardContent>

      <CardFooter>
        <View className="w-full">
          <Button
            variant="link"
            className="w-full"
            onPress={() => {
              router.push('/forget-password');
            }}
          >
            <Text className="text-center underline">Forget Password?</Text>
          </Button>

          <Button onPress={handleSignIn}>
            <Text>Continue</Text>
          </Button>

          <Text className="mt-2 text-center">
            Don't have an account?{' '}
            <Text
              className="underline"
              onPress={() => {
                router.push('/sign-up');
              }}
            >
              Create Account
            </Text>
          </Text>
        </View>
      </CardFooter>
    </Card>
  );
}
