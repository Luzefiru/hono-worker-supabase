import { createServerClient } from '@supabase/ssr';
import type { MiddlewareHandler } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { env } from 'hono/adapter';
import { Context } from 'hono';

export const supabaseMiddleware: MiddlewareHandler = async (
  c: Context,
  next
) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = env(c);

  const client = createServerClient(
    SUPABASE_URL ?? '',
    SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        get: (key: string) => {
          return getCookie(c, key);
        },
        set: (key: string, value: any, options: object) => {
          setCookie(c, key, value, options);
        },
        remove: (key: string, options: object) => {
          deleteCookie(c, key, options);
        },
      },
      cookieOptions: {
        httpOnly: true,
        secure: true,
      },
    }
  );
  c.set('supabase', client);
  await next();
};
