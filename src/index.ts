import { Hono, Context, Env } from 'hono';
import { supabaseMiddleware } from './middleware/supabase';

const app = new Hono();

app.use(supabaseMiddleware);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

// Need to type the context for intellisense
app.get('/tasks', async (c: Context<Env>) => {
  const { data: tasks, error } = await c.var.supabase.from('tasks').select();

  if (error) {
    throw error;
  }

  return c.json(tasks);
});

app.get('/public/*', async (ctx) => {
  // @ts-ignore
  return await ctx.env.ASSETS.fetch(ctx.req.raw);
});

export default app;
