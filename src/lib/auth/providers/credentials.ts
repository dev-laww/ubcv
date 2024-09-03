import Credentials, { CredentialsConfig } from 'next-auth/providers/credentials';
import { prisma } from '@lib/prisma';
import { compare } from '@utils/password';

const options: Partial<CredentialsConfig> = {
    credentials: {
        email: {},
        password: {}
    },
    authorize: async (credentials: { email?: string, password?: string }) => {
        const { email, password } = credentials

        if (!email || !password) throw new Error('Missing credentials')

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username: email }
                ]
            }
        });

        if (!user?.password) return null

        const valid = await compare(password, user.password)

        if (!valid) return null

        return user
    }
}

export const credentials = Credentials(options)
