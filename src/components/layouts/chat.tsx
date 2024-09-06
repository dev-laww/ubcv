'use client'

import { AppShell, Box, Burger, Group } from '@mantine/core';
import { useDisclosure, useHeadroom, useMediaQuery } from '@mantine/hooks';
import React from 'react';


const Chat: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
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
            padding='md'
        >
            <AppShell.Header>
                <Group h='100%' px='md'>
                    <Burger opened={ mobileOpened } onClick={ toggleMobile } hiddenFrom='md' size='sm' />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='md'>

            </AppShell.Navbar>
            <AppShell.Main mah='100vh'>
                <Box>
                    <Burger
                        opened={ desktopOpened }
                        onClick={ toggleDesktop }
                        visibleFrom='md'
                        size='sm'
                        pos='fixed'
                        style={ { zIndex: 999 } }
                    />
                    { children }
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}


export { Chat };
