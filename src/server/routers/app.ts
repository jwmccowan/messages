import { createRouter } from '../create-router';
import { Subscription } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';

function getUserByName(name: string) {
  return {
    name,
    email: 'john@bop.ho',
  };
}

const messages = [
  {
    from: 'John',
    to: 'Jane',
    text: 'Hello',
  },
  {
    from: 'Jane',
    to: 'John',
    text: 'Hi',
  },
];

const appRouter = createRouter()
  .transformer(superjson)
  .query('hello', {
    input: z.object({ text: z.string().nullish() }).nullish(),
    resolve({ input }) {
      return { greeting: `hello ${input?.text ?? 'world'}` };
    },
  })
  .query('messages', {
    input: z.object({ user: z.string() }),
    resolve({ ctx, input }) {
      const user = ctx.session?.user;
      const recipient = getUserByName(input.user);
      if (!user) {
        return [];
      }
      return messages;
    },
  })
  .subscription('random-number', {
    resolve() {
      return new Subscription<number>((emit) => {
        const interval = setInterval(() => {
          emit.data(Math.floor(Math.random() * 100));
        }, 5000);
        return () => clearInterval(interval);
      });
    },
  });

export default appRouter;

export type AppRouter = typeof appRouter;
