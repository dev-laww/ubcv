import React, { useCallback, useEffect, useState } from 'react';
import { get } from '@actions/conversation';
import { AiChat, HumanChat } from '@components/common/chat';
import { useRouter, useSearchParams } from 'next/navigation';
import { create, message } from '@actions/message';
import { useSettings } from '@hooks/use-settings';
import { Settings } from '@types';

export const useChat = () => {
    const searchParams = useSearchParams()
    const [ hasError, setHasError ] = useState(false)
    const { settings } = useSettings() as { settings: Settings }
    const [ conversation, setConversation ] = useState<React.ReactNode[]>([])
    const router = useRouter()

    const send = useCallback(async (input: string) => {
        setConversation(messages => [
            ...messages,
            <HumanChat content={ input } key={ Math.random() } />
        ])

        try {
            const thread = searchParams.get('thread')
            let id: string = ''

            if (!thread) {
                id = await create()

                router.replace(`/chat?thread=${ id }`)
            }

            setConversation(messages => [
                ...messages,
                <AiChat loading key={ Math.random() } />
            ])

            const response = await message({ thread: thread || id, input }).then(async res => {
                const aud = await fetch('/api/tts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ input: res, voice: settings.voice.toLowerCase() })
                });

                if (!aud.ok) throw new Error('Failed to fetch audio');

                const audioBlob = await aud.blob();
                const url = URL.createObjectURL(audioBlob);

                const audio = new Audio(url);

                audio.onended = () => URL.revokeObjectURL(url);

                await audio.play();

                return res
            })

            setConversation(messages => [
                ...messages.slice(0, -1),
                <AiChat content={ response } key={ Math.random() } slice />
            ])
        } catch (error) {
            console.error(error)
            setHasError(true)
        }
    }, [ router, searchParams, settings ]);

    useEffect(() => {
        const thread = searchParams.get('thread')

        if (!thread) {
            setConversation([])
            return
        }

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