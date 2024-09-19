'use server'

import { prisma } from '@lib/prisma';
import { auth } from '@lib/auth';
import { Chain } from '@lib/llm/chain';
import { Session } from 'next-auth';

export const all = async () => {
    const { user } = await auth() || {}

    return prisma.conversation.findMany({
        where: { user: { email: user!.email! } },
        orderBy: { createdAt: 'desc' }
    });
}

export const get = async (id: string) => {
    const session = await auth() as Session;

    const conversation = await prisma.conversation.findUnique({
        where: {
            id,
            user: { email: session.user!.email! }
        },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    if (!conversation) return null;

    return conversation.messages;
}

export const generateTitle = async (id: string) => {
    const conversation = await prisma.conversation.findUnique({ where: { id }, include: { messages: true } });

    if (conversation?.title) return conversation.title;

    if (!conversation || ((conversation?.messages?.length || 0) < 4)) return null;

    const title = await Chain.title(id) as string;

    await prisma.conversation.update({
        where: { id },
        data: { title }
    });

    return title;
}