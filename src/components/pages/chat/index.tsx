'use client'

import { Box, Container, Flex, Group, ScrollArea } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { Message } from '@components/forms';
import { useElementSize } from '@mantine/hooks';
import dynamic from 'next/dynamic'
import { useChat, useSettings } from '@hooks';
import { Settings } from '@types'

const Avatar = dynamic(() => import('./avatar').then(mod => mod.Avatar), { ssr: false })


const Chat = () => {
    const viewport = useRef<HTMLDivElement>(null);
    const { ref, height } = useElementSize()
    const { settings } = useSettings() as { settings: Settings }
    const [ avatar, setAvatar ] = useState('avatars/avatar.glb')
    const { send, conversation, hasError } = useChat()

    useEffect(() => {
        if (!settings) return

        setAvatar(settings.avatar)
    }, [ settings ])

    useEffect(() => {
        const { scrollHeight, clientHeight, scrollTop } = viewport.current!
        // TODO: Fix this

        viewport.current?.scrollTo({ top: scrollHeight, behavior: 'smooth' })
    }, [ height ])


    return (
        <Group h='100%' grow>
            <Flex direction='column' h='100%' miw={ { base: '100%', sm: '60%' } } justify='flex-end'>
                <ScrollArea
                    viewportRef={ viewport }
                    scrollbarSize={ 3 }
                    offsetScrollbars
                >
                    <Container size='sm' py='lg' ref={ ref }>
                        { conversation }
                    </Container>
                </ScrollArea>
                <Box w='100%' mb='xl'>
                    <Container size='sm'>
                        <Message send={ send } />
                    </Container>
                </Box>
            </Flex>
            <Box visibleFrom='sm'>
                <Avatar position={ [ -1, -2, 5 ] } scale={ 1.4 } avatar={ avatar } />
            </Box>
        </Group>
    )
}


export { Chat }
