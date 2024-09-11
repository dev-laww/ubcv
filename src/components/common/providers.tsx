import React from 'react';

import { MantineProvider } from '@mantine/core';
import { theme } from '@lib';
import { SessionProvider } from 'next-auth/react';
import { Notifications } from '@mantine/notifications';

import '@mantine/notifications/styles.css'
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { ModalsProvider } from '@mantine/modals';

const Providers: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
    return (
        <SessionProvider>
            <MantineProvider theme={ theme }>
                <ModalsProvider>
                    <Notifications />
                    { children }
                </ModalsProvider>
            </MantineProvider>
        </SessionProvider>
    )
}

export { Providers };