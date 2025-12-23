import z from 'zod';
import { parseObjectWithZod, sharedEnvSchema } from '@product-base/shared';

const expoEnvSchema = z.object({
  EXPO_PUBLIC_API_BASE_URL: z.url({ error: 'EXPO_PUBLIC_API_BASE_URL is required' })
});

const envSchema = expoEnvSchema.extend(sharedEnvSchema.shape);

export type EnvType = z.infer<typeof envSchema>;

let env: EnvType;

parseObjectWithZod({
  object: process.env,
  schema: envSchema,
  onError: (error) => {
    console.error(
      'Invalid environment variables: \n',
      error.issues.map((issue) => `-> ${issue.message}`).join('\n')
    );
    process.exit(1);
  },
  onSuccess: (data) => {
    env = data;
  }
});

export { env };
