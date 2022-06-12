import trpc from '@trpc/server';
// import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import trpcNext from '@trpc/server/adapters/next';
import type { NodeHTTPCreateContextFnOptions } from '@trpc/server/dist/declarations/src/adapters/node-http';
import type { IncomingMessage } from 'http';
import ws from 'ws';

// const prisma = new PrismaClient({
//   log:
//     process.env.NODE_ENV === 'development'
//       ? ['query', 'error', 'warn']
//       : ['error'],
// });

const createContext = async ({
  req,
  res,
}:
  | trpcNext.CreateNextContextOptions
  | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
  const session = await getSession({ req });
  console.log('createContext for', session?.user?.name ?? 'unknown user');
  return {
    req,
    res,
    session,
    // prisma,
  };
};

export default createContext;

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
