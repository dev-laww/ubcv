'use client'

import { Box, Container, Grid, Paper, ScrollArea, Stack } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Message } from '@components/forms';

const Chat = () => {
    const viewport = useRef<HTMLDivElement>(null);
    const matches = useMediaQuery('(max-width: 48em)');

    useEffect(() => {
        viewport.current?.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' })
    }, [])


    return (
        <Grid h='100%'>
            <Grid.Col span={ { base: 12, md: 8 } } py={ 0 }>
                <ScrollArea
                    w='100%'
                    type='scroll'
                    viewportRef={ viewport }
                    offsetScrollbars scrollbarSize={ 4 } px='sm'
                    h={ matches ? 'calc(100vh - calc(4.5rem * var(--mantine-scale)))' : 'calc(100vh - var(--mantine-spacing-md))' }
                >
                    <Container size='sm'>
                        <Stack h='200vh' justify='end'>
                            <h1>Chat</h1>
                            <h1>Chat</h1>
                            <h1>Chat</h1>
                            <h1>Chat</h1>
                            <h1>Chat</h1>
                            <h1>Chat</h1>
                            <h1>Chat</h1>
                            <h1>Chat</h1>
                            <h1>Chat</h1>
                            <h1>Chat</h1>
                        </Stack>
                        <Box pb='lg' pos='sticky' bottom={ 0 }>
                            <Message />
                        </Box>
                    </Container>
                </ScrollArea>
            </Grid.Col>
            <Grid.Col span={ { md: 4 } } visibleFrom='md' h='calc(100vh - var(--mantine-spacing-md))' p={ 0 }>
                <Paper w='100%' h='100%' bg='puceRed.4' radius='md' m={ 0 } p={ 0 }>

                </Paper>
            </Grid.Col>
        </Grid>
    )
}

export { Chat }