'use client'

import { ActionIcon, AppShell, Burger, Flex, Group } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Navigation } from '@components/common';
import { Session } from 'next-auth';
import { IconEdit, IconLayoutSidebar } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { SettingsProvider } from '@context';

interface ChatProps extends React.PropsWithChildren {
    session: Session;
}

const Chat: React.FC<Readonly<ChatProps>> = ({ children, session }) => {
    const [ mobileOpened, { toggle: toggleMobile } ] = useDisclosure();
    const [ desktopOpened, { toggle: toggleDesktop } ] = useDisclosure(true);
    const matches = useMediaQuery('(max-width: 62em)');
    const router = useRouter()

    return (
        <SettingsProvider>
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
                    <Group h='100%' px='md' justify='space-between'>
                        <Burger
                            opened={ mobileOpened }
                            onClick={ toggleMobile }
                            hiddenFrom='md' size='sm'
                            color='puceRed.1'
                        />

                        <ActionIcon color='puceRed.1' variant='transparent' onClick={ () => {
                            mobileOpened && toggleMobile()
                            router.push('/chat')
                        } }>
                            <IconEdit stroke={ 1.5 } />
                        </ActionIcon>
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar p='md' bg='puceRed'>
                    <Group w='100%' justify='space-between' visibleFrom='sm'>
                        <ActionIcon color='puceRed.1' variant='transparent' onClick={ toggleDesktop }>
                            <IconLayoutSidebar stroke={ 1.5 } />
                        </ActionIcon>
                        <ActionIcon color='puceRed.1' variant='transparent' onClick={ () => router.push('/chat') }>
                            <IconEdit stroke={ 1.5 } />
                        </ActionIcon>
                    </Group>
                    <Navigation session={ session } mobileNavOpened={ mobileOpened } toggleMobileNav={ toggleMobile } />
                </AppShell.Navbar>

                <AppShell.Main
                    mah='100vh'
                    style={ {
                        display: 'flex',
                        background: 'url(/ub-logo.png) no-repeat center center / 60vmin 60vmin',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        backgroundBlendMode: 'lighten'
                    } }
                >
                    <Flex direction='column' w='100%'>
                        { !desktopOpened && (
                            <Group visibleFrom='sm'>
                                <ActionIcon variant='transparent' onClick={ toggleDesktop }>
                                    <IconLayoutSidebar />
                                </ActionIcon>
                                <ActionIcon variant='transparent' onClick={ () => router.push('/chat') }>
                                    <IconEdit stroke={ 1.5 } />
                                </ActionIcon>
                            </Group>
                        ) }
                        { children }
                    </Flex>
                </AppShell.Main>
            </AppShell>
        </SettingsProvider>
    )
        ;
}


export { Chat };
