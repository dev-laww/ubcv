import { NextRequest, NextResponse } from 'next/server';


import NextAuth from 'next-auth';
import { authOptions } from '@lib/auth';

const { adapter, ...options } = authOptions;
const { auth } = NextAuth({
    session: { strategy: 'jwt' },
    ...options
})


export const middleware = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;

    const session = await auth()

    if (pathname === '/') {
        if (session) return NextResponse.rewrite(new URL('/chat', req.nextUrl));

        return NextResponse.next();
    }
    
    if (pathname.includes('/auth') && session) return NextResponse.rewrite(new URL('/not-found', req.nextUrl));

    if (!session) return NextResponse.redirect(new URL('/auth/login', req.nextUrl));

    return NextResponse.next();
}


export const config = { matcher: '/((?!.*\\.|api|auth|legal).*)' }