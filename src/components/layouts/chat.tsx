'use client'

import { AppShell, Burger, Flex, Group, ScrollArea, Skeleton } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Navigation } from '@components/common';
import { Session } from 'next-auth';

interface ChatProps extends React.PropsWithChildren {
    session: Session;
}

const Chat: React.FC<Readonly<ChatProps>> = ({ children, session }) => {
    const [ mobileOpened, { toggle: toggleMobile } ] = useDisclosure();
    const [ desktopOpened, { toggle: toggleDesktop } ] = useDisclosure(true);
    const matches = useMediaQuery('(max-width: 62em)');

    return (
        <AppShell
            header={ { height: 60, collapsed: !matches } }
            navbar={ {
                width: 350,
                breakpoint: 'md',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
            } }
            withBorder={ false }
            padding='md'

        >
            <AppShell.Header bg='puceRed'>
                <Group h='100%' px='md'>
                    <Burger
                        opened={ mobileOpened }
                        onClick={ toggleMobile }
                        hiddenFrom='md' size='sm'
                        color='puceRed.1'
                    />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p='md' bg='puceRed'>
                <Navigation session={ session } />
            </AppShell.Navbar>

            <AppShell.Main mah='100vh' style={ { display: 'flex' } }>
                <Flex direction='column' w='100%'>
                    <Burger
                        opened={ desktopOpened }
                        onClick={ toggleDesktop }
                        visibleFrom='md'
                        size='sm'
                        pos='fixed'
                        style={ { zIndex: 999 } }
                    />
                    { children }
                </Flex>
            </AppShell.Main>
        </AppShell>
    );
}


export { Chat };
