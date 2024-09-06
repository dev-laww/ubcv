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

    if (pathname === '/') return NextResponse.next();

    const session = await auth()

    if (!session) return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
    //
    // if (pathname.includes('/admin')) {
    //     if (session.user.role === 'admin') {
    //         if (pathname === '/admin') return NextResponse.rewrite(new URL('/admin/dashboard', req.nextUrl));
    //
    //         return NextResponse.next()
    //     }
    //
    //     return NextResponse.rewrite(new URL('/not-found', req.nextUrl));
    // }

    return NextResponse.next();
}


export const config = { matcher: '/((?!.*\\.|api|auth).*)' }