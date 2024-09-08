'use client'

import { Box, Container, Flex, Group, ScrollArea } from '@mantine/core';
import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Message } from '@components/forms';


const Chat = () => {
    const viewport = useRef<HTMLDivElement>(null);
    const matches = useMediaQuery('(max-width: 48em)');

    useEffect(() => {
        viewport.current?.scrollTo({ top: viewport.current!.scrollHeight * 2, behavior: 'smooth' })
    }, [])


    return (
        <Group h='100%' grow>
            <Flex direction='column' h='100%' miw={ { base: '100%', sm: '60%' } } justify='flex-end'>
                <ScrollArea viewportRef={ viewport }>
                    <Container size='sm' py='lg'>

                    </Container>
                </ScrollArea>
                <Box w='100%' mb='xl'>
                    <Container size='sm'>
                        <Message />
                    </Container>
                </Box>
            </Flex>
            <Box visibleFrom='sm'>
            </Box>
        </Group>
    )
}


export { Chat }
