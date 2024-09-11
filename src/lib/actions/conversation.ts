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

export const get = async (id: string) => {
    return prisma.message.findMany({
        where: { conversation: { id } },
        orderBy: { createdAt: 'asc' }
    })
}

const generateTitle = async (id: string) => {
    // TODO: Implement title generation

    return id
}