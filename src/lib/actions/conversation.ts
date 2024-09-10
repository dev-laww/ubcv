'use server'

import { prisma } from '@lib/prisma';
import { auth } from '@lib/auth';

export const all = async () => {
    const { user } = await auth() || {}

    return prisma.conversation.findMany({
        where: { user: { email: user!.email! } },
        orderBy: { createdAt: 'desc' }
    });
}

const generateTitle = async (id: string) => {
    // TODO: Implement title generation

    return id
}