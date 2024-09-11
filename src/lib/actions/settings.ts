'use server'

import { auth } from '@lib/auth';
import { prisma } from '@lib/prisma';
import { Settings } from '@types';

export const get = async () => {
    const { user } = await auth() || {}
    const { email } = user || {}

    if (!email) return null


    const settings: Settings | null = await prisma.user.findUnique({
        where: { email },
        select: {
            settings: {
                select: {
                    id: true,
                    voice: true,
                    avatar: true
                }
            }
        }
    }).then(res => res?.settings!)

    return settings
}

export const update = async (settings: Settings) => {
    const { id, ...data } = settings
    return prisma.userSettings.update({
        where: { id },
        data
    });
}