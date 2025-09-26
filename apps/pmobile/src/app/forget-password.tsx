import { useState } from 'react';
import Icons from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Button } from '../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/card';
import { Input } from '../components/input';
import { Text } from '../components/text';
import { authClient } from '../lib/auth-client';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');

  const handleRequestPasswordReset = () => {
    authClient.requestPasswordReset({
      email,
      redirectTo: '/reset-password'
    });
  };

  return (
    <Card className="w-10/12">
      <CardHeader>
        <CardTitle>Forget Password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>

      <CardContent className="mb-2 px-6">
        <Input
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </CardContent>

      <CardFooter>
        <View className="w-full gap-2">
          <Button onPress={handleRequestPasswordReset} className="w-full" variant="default">
            <Text>Send Email</Text>
          </Button>

          <Button
            onPress={() => {
              router.push('/');
            }}
            className="w-full flex-row items-center gap-4"
            variant="outline"
          >
            <Icons name="arrowleft" size={18} />

            <Text>Back to Sign In</Text>
          </Button>
        </View>
      </CardFooter>
    </Card>
  );
}
