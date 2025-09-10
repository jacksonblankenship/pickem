import { z } from 'zod';

const common = {
  VITE_SUPABASE_URL: z.url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
} satisfies Record<string, z.ZodType>;

const envSchema = z.discriminatedUnion('VITE_VERCEL_ENV', [
  z.object({
    VITE_VERCEL_ENV: z.literal('development'),
    VITE_VERCEL_URL: z.unknown(),
    VITE_VERCEL_PROJECT_PRODUCTION_URL: z.unknown(),
    ...common,
  }),
  z.object({
    VITE_VERCEL_ENV: z.literal('preview'),
    VITE_VERCEL_URL: z.string().min(1),
    VITE_VERCEL_PROJECT_PRODUCTION_URL: z.unknown(),
    ...common,
  }),
  z.object({
    VITE_VERCEL_ENV: z.literal('production'),
    VITE_VERCEL_URL: z.unknown(),
    VITE_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1),
    ...common,
  }),
]);

export const env = envSchema.parse(import.meta.env);
