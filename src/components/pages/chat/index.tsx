'use client'

import { Box, Container, Flex, Group, ScrollArea } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { Message } from '@components/forms';
import { useElementSize } from '@mantine/hooks';
import dynamic from 'next/dynamic'

const Avatar = dynamic(() => import('./avatar').then(mod => mod.Avatar), { ssr: false })


const Chat = () => {
    const viewport = useRef<HTMLDivElement>(null);
    const [ content, setContent ] = useState<React.ReactNode[]>([]);
    const { ref, height } = useElementSize()

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
                        {/*    content here   */ }
                    </Container>
                </ScrollArea>
                <Box w='100%' mb='xl'>
                    <Container size='sm'>
                        <Message />
                    </Container>
                </Box>
            </Flex>
            <Box visibleFrom='sm'>
                <Avatar  position={ [ -1, -2, 5 ] } scale={ 1.4 } avatar='avatars/avatar.glb'/>
            </Box>
        </Group>
    )
}


export { Chat }
