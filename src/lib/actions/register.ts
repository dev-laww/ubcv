'use server'

import { prisma } from '@lib/prisma'
import { hash } from '@utils/password';

const register = async (data: any) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: data.email },
                { username: data.username }
            ]
        }
    })

    if (user) {
        if (user.password) return 'Password already set, please login'

        await prisma.user.update({
            where: { id: user.id },
            data: {
                username: data.username,
                password: await hash(data.password)
            }
        })

        return
    }

    await prisma.user.create({
        data: {
            name: data.name,
            username: data.username,
            email: data.email,
            password: await hash(data.password)
        }
    })
}

const available = async (username: string) => {
    const user = await prisma.user.findFirst({ where: { username } })

    return !user
}

export { register, available }