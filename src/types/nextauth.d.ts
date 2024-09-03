import { User as NextAuthUser } from 'next-auth';


declare module 'next-auth' {
    interface User extends NextAuthUser {
        username?: string | null
    }
}