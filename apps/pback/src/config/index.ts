import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PBACK_PORT: z.coerce.number().default(3000),
  PBACK_HOST: z.string().default('localhost'),
  DATABASE_URL: z.string({ error: 'DATABASE_URL is required' }).min(1),
  BETTER_AUTH_SECRET: z.string({ error: 'BETTER_AUTH_SECRET is required' }).min(10),
  BETTER_AUTH_URL: z.url({ error: 'BETTER_AUTH_URL is required' })
});

let config: z.infer<typeof envSchema>;

(() => {
  const env = process.env;
  const result = envSchema.safeParse(env);

  if (result.error) {
    console.error(
      'Invalid environment variables: \n',
      result.error.issues.map((issue) => `-> ${issue.message}`).join('\n')
    );
    process.exit(1);
  }

  config = result.data;
})();

export { config };
