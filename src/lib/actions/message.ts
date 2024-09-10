'use server'

import { auth } from '@lib/auth';
import { Chain } from '@lib/llm/chain';
import { prisma } from '@lib/prisma';

interface MessageOptions {
    thread: string;
    input: string;
}

const create = async () => {
    const { user } = await auth() || {}

    return prisma.conversation.create({
        data: {
            user: { connect: { email: user!.email! } }
        }
    }).then(({ id }) => id)
}

const message = async ({ thread, input }: MessageOptions) => {
    const session = await Chain.session(thread)

    const response = await session.invoke(input)

    return response.answer
}

export { create, message }
