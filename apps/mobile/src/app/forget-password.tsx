import Icons from '@expo/vector-icons/AntDesign';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, View } from 'react-native';
import { z } from 'zod';

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Text } from '../components/ui/text';
import { authClient } from '../lib/auth-client';
import { formatFormErrors } from '../lib/utils';

const forgetPasswordSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' })
});

type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;

export default function RequestPasswordReset() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const onValidSubmit = (data: ForgetPasswordFormData) => {
    authClient.requestPasswordReset({
      email: data.email,
      redirectTo: '/reset-password'
    });
  };

  const onInvalidSubmit = (errors: FieldErrors<ForgetPasswordFormData>) => {
    const formattedErrors = formatFormErrors(errors);
    Alert.alert('Validation Error', formattedErrors);
  };

  return (
    <Card className="w-10/12">
      <CardHeader>
        <CardTitle>Forget Password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>

      <CardContent className="mb-2 px-6">
        <KeyboardAvoidingView>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                autoCapitalize="none"
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
              />
            )}
          />
        </KeyboardAvoidingView>
      </CardContent>

      <CardFooter>
        <View className="w-full gap-2">
          <Button
            onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
            className="w-full"
            variant="default"
            disabled={isSubmitting}
          >
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
