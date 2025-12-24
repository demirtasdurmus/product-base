import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/AntDesign';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useNavigationContainerRef } from 'expo-router';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, View } from 'react-native';
import { z } from 'zod';

import { MOBILE_SERVICE_NAME } from '@product-base/shared';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { Text } from '../components/ui/text';
import { Muted, P } from '../components/ui/typography';
import { authClient } from '../lib/auth-client';
import { formatFormErrors } from '../lib/utils';

const signInSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional()
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function Index() {
  const { data: isAuthenticated, isPending } = authClient.useSession();
  const navContainerRef = useNavigationContainerRef();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onValidSubmit = (data: SignInFormData) => {
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe || false
      },
      {
        onError: (ctx) => {
          Alert.alert('Sign In Error', ctx.error.message);
        }
      }
    );
  };

  const onInvalidSubmit = (errors: FieldErrors<SignInFormData>) => {
    const formattedErrors = formatFormErrors(errors);
    Alert.alert('Validation Error', formattedErrors);
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
    return <ActivityIndicator testID="activity-indicator" />;
  }

  return (
    <Card className="bg-secondary z-50 mx-6 backdrop-blur-lg">
      <CardHeader className="flex items-center justify-center gap-8">
        <Image
          source={require('../../assets/images/icon.png')}
          style={{
            width: 40,
            height: 40
          }}
        />
        <CardTitle testID="heading">Sign In to your account</CardTitle>
      </CardHeader>

      <CardContent className="gap-2 px-6">
        <Button
          onPress={() => {
            authClient.signIn.social({
              provider: 'google',
              callbackURL: `${MOBILE_SERVICE_NAME}://dashboard`
            });
          }}
          variant="outline"
          className="flex flex-row items-center gap-2"
        >
          <Ionicons name="google" size={16} />
          <Text>Sign In with Google</Text>
        </Button>

        <Button
          variant="outline"
          className="flex flex-row items-center gap-2"
          onPress={() => {
            authClient.signIn.social({
              provider: 'github',
              callbackURL: `${MOBILE_SERVICE_NAME}://dashboard`
            });
          }}
        >
          <Ionicons name="github" size={16} />
          <Text>Sign In with GitHub</Text>
        </Button>

        <View className="my-4 w-full flex-row items-center gap-2 px-6">
          <Separator className="w-3/12 flex-grow" />
          <Muted>or continue with</Muted>
          <Separator className="w-3/12 flex-grow" />
        </View>

        <View>
          <KeyboardAvoidingView>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email Address"
                  className="rounded-b-none border-b-0"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Password"
                  className="rounded-t-none"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </KeyboardAvoidingView>
        </View>

        <View className="flex-row items-center gap-2">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <Checkbox checked={value || false} onCheckedChange={onChange} />
            )}
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

          <Button onPress={handleSubmit(onValidSubmit, onInvalidSubmit)} disabled={isSubmitting}>
            <Text>Continue</Text>
          </Button>

          <P className="mt-2 text-center">
            Don't have an account?{' '}
            <Text
              className="underline"
              onPress={() => {
                router.push('/sign-up');
              }}
            >
              Create Account
            </Text>
          </P>
        </View>
      </CardFooter>
    </Card>
  );
}
