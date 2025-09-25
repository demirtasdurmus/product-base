import z from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_BASE_URL: z.url({ error: 'EXPO_PUBLIC_API_BASE_URL is required' })
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
