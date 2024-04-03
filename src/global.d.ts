import {} from 'hono';
import { SupabaseClient } from '@supabase/supabase-js';

declare module 'hono' {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props?: { title?: string; path?: string }
    ): Response;
  }

  interface Env {
    // c.var types
    Variables: {
      supabase: SupabaseClient;
    };

    // c.env types
    Bindings: {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
    };
  }
}
