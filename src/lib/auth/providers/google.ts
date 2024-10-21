import Google, { GoogleProfile } from 'next-auth/providers/google';
import { OAuthUserConfig } from '@auth/core/providers';

if (!process.env.AUTH_GOOGLE_ID) {
    throw new Error('Missing env.AUTH_GOOGLE_ID')
}

if (!process.env.AUTH_GOOGLE_SECRET) {
    throw new Error('Missing env.AUTH_GOOGLE_SECRET')
}

const options: Partial<OAuthUserConfig<GoogleProfile>> = {
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    allowDangerousEmailAccountLinking: true,
    authorization: {
        params: {
            prompt: 'select_account',
            hd: 'domain.edu.ph' // TODO: Change to organization domain
        }
    }
}

export const google = Google(options)