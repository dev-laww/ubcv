import NextAuth, { NextAuthConfig } from 'next-auth'
import { credentials, google } from './providers';
import { prisma } from '@lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import * as humps from 'humps';
import { Camelized } from 'humps';
import { JWT } from '@auth/core/jwt';


export const authOptions: NextAuthConfig = {
    providers: [ credentials, google ],
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    pages: {
        error: '/auth/error',
        newUser: '/auth/new-user'
    },
    callbacks: {
        jwt: async ({
            token,
            user,
            account,
            profile,
            session
        }) => ({ ...token, ...user, ...account, ...profile, ...session }),
        session: async ({ session, token }) => {
            const {
                name,
                email,
                image,
                username
            } = humps.camelizeKeys(token) as Camelized<JWT> & {
                username?: string
                image?: string
                email: string
            }

            session.user = {
                ...session.user,
                name,
                email,
                image,
                username
            }

            return session
        },
        signIn: async ({ account, profile }) => {
            // if (account?.provider === 'google') {
            //     return profile?.email?.endsWith('@example.com') ?? false
            // }

            return true
        }
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)