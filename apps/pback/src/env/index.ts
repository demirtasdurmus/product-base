import z from 'zod';
import { parseObjectWithZod, sharedEnvSchema } from '@product-base/shared';

const serverEnvSchema = z.object({
  PBACK_PORT: z.coerce.number().default(3000),
  PBACK_HOST: z.string().default('0.0.0.0'),
  BETTER_AUTH_SECRET: z.string({ error: 'BETTER_AUTH_SECRET is required' }).min(10),
  BETTER_AUTH_URL: z.url({ error: 'BETTER_AUTH_URL is required' }),
  GOOGLE_CLIENT_ID: z.string({ error: 'GOOGLE_CLIENT_ID is required' }),
  GOOGLE_CLIENT_SECRET: z.string({ error: 'GOOGLE_CLIENT_SECRET is required' }),
  DATABASE_URL: z
    .url({
      message: 'DATABASE_URL must be a valid PostgreSQL connection string',
      protocol: /^postgres$/
    })
    .min(10)
});

const envSchema = serverEnvSchema.extend(sharedEnvSchema.shape);

export type EnvType = z.infer<typeof envSchema>;

let env: EnvType;

parseObjectWithZod({
  object: process.env,
  schema: envSchema,
  onError: (error) => {
    console.error(
      'Invalid environment variables:\n',
      error.issues.map((issue) => `-> ${issue.message}`).join('\n ')
    );
    process.exit(1);
  },
  onSuccess: (data) => {
    env = data;
  }
});

export { env };
