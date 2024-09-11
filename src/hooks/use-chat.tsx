import React, { useEffect, useState } from 'react';
import { get } from '@actions/conversation';
import { AiChat, HumanChat } from '@components/common/chat';
import { useRouter, useSearchParams } from 'next/navigation';
import { create, message } from '@actions/message';

export const useChat = () => {
    const searchParams = useSearchParams()
    const [ hasError, setHasError ] = useState(false)
    const [ conversation, setConversation ] = useState<React.ReactNode[]>([])
    const router = useRouter()

    const send = async (input: string) => {
        const thread = searchParams.get('thread')
        let id: string = ''

        if (!thread) {
            id = await create()

            router.replace(`/chat?thread=${ id }`)
        }

        setConversation(messages => [
            ...messages,
            <HumanChat content={ input } key={ Math.random() } />
        ])

        try {

            let id: string = ''

            if (!thread) {
                id = await create()

                router.replace(`/chat?thread=${ id }`)
            }

            setConversation(messages => [
                ...messages,
                <AiChat loading key={ Math.random() } />
            ])

            const response = await message({ thread: thread || id, input })

            setConversation(messages => [
                ...messages.slice(0, -1),
                <AiChat content={ response } key={ Math.random() } slice />
            ])
        } catch (error) {
            console.error(error)
            setHasError(true)
        }
    }

    useEffect(() => {
        const thread = searchParams.get('thread')

        if (!thread) return

        const getConversation = async () => {
            const messages = await get(thread)

            const messagesList = messages.map(message => {
                if (message.type === 'HUMAN')
                    return <HumanChat content={ message.content } key={ message.id } />

                return <AiChat content={ message.content } key={ message.id } />
            })

            setConversation(messagesList)
        }

        getConversation().catch(() => setHasError(true))
    }, [ searchParams ]);

    return { send, conversation, hasError }
}