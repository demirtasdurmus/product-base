import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { Alert, Image, KeyboardAvoidingView, View } from 'react-native';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Text } from '../components/ui/text';
import { P } from '../components/ui/typography';
import { authClient } from '../lib/auth-client';
import { formatFormErrors } from '../lib/utils';

const signUpSchema = z.object({
  name: z
    .string({ error: 'Name is required' })
    .min(2, { message: 'Name must be at least 2 characters' }),
  email: z.email({ error: 'Please enter a valid email' }),
  password: z
    .string({ error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters')
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onValidSubmit = (data: SignUpFormData) => {
    authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name
      },
      {
        onError: (ctx) => {
          Alert.alert('Sign Up Error', ctx.error.message);
        },
        onSuccess: (_ctx) => {
          router.push('/dashboard');
        }
      }
    );
  };

  const onInvalidSubmit = (errors: FieldErrors<SignUpFormData>) => {
    const formattedErrors = formatFormErrors(errors);
    Alert.alert('Validation Error', formattedErrors);
  };

  return (
    <Card className="z-50 mx-6">
      <CardHeader className="flex items-center justify-center gap-8">
        <Image
          source={require('../../assets/images/icon.png')}
          style={{
            width: 40,
            height: 40
          }}
        />
        <CardTitle>Create new Account</CardTitle>
      </CardHeader>

      <CardContent className="px-6">
        <KeyboardAvoidingView>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Name"
                className="rounded-b-none border-b-0"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </KeyboardAvoidingView>

        <KeyboardAvoidingView>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                className="rounded-b-none rounded-t-none border-b-0"
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
      </CardContent>

      <CardFooter>
        <View className="mt-2 w-full">
          <Button onPress={handleSubmit(onValidSubmit, onInvalidSubmit)} disabled={isSubmitting}>
            <Text>Sign Up</Text>
          </Button>

          <P className="mt-2 text-center">
            Already have an account?{' '}
            <Text
              className="underline"
              onPress={() => {
                router.push('/');
              }}
            >
              Sign In
            </Text>
          </P>
        </View>
      </CardFooter>
    </Card>
  );
}
