import * as trpcNext from '@trpc/server/adapters/next';
import router from '../../../server/routers/app';
import createContext from '../../../server/create-context';

export type AppRouter = typeof router;

export default trpcNext.createNextApiHandler({
  router,
  createContext,
});
