import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    // Passwordless / email sign in
    CredentialsProvider({
      id: 'github',
      name: 'Mocked GitHub',
      async authorize(credentials) {
        const user = {
          id: credentials?.name,
          name: credentials?.name,
          email: credentials?.name,
        };
        return user;
      },
      credentials: {
        name: { type: 'test' },
      },
    }),
  ],
});
