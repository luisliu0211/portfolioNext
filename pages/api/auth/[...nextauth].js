// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { getServerSession } from 'next-auth/next';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: {
          label: 'Enter Email',
          type: 'email',
          placeholder: 'examole@example.com',
        },
        password: {
          label: 'Enter Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${apiUrl}/api/auth/verify-credentials`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          if (res.ok) {
            // 验证成功，返回用户信息
            const data = await res.json();
            const user = {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              accountType: data.user.accountType,
              image: data.user.image,
            };
            // const user = data.user; // 包含用户信息的对象
            console.log('使用者登入成功!!', user);
            return Promise.resolve(user);
          } else {
            // 验证失败，返回 null
            return Promise.resolve(null);
          }
        } catch (err) {
          console.error('Error during credential verification:', err);
          // 处理错误情况，返回 null
          return Promise.resolve(null);
        }
      },
    }),
  ],
  // callbacks: {
  //   async session({ session, user }) {
  //     console.log('session callback: user', user);
  //     session.user.id = user.id;
  //     session.user.name = user.name;
  //     session.user.email = user.email;
  //     session.user.accountType = user.accountType;
  //     session.user.image = user.image;
  //     return Promise.resolve(session);
  //   },
  //   maxAge: 30 * 24 * 60 * 60,
  // },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);

export const getServerAuthSession = (req, res) => {
  return getServerSession(req, res, authOptions);
};
