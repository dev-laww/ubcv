import React from 'react';

import { MantineProvider } from '@mantine/core';
import { theme } from '@lib';
import { SessionProvider } from 'next-auth/react';
import { Notifications } from '@mantine/notifications';

import '@mantine/notifications/styles.css'
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { SettingsProvider } from '@context';

const Providers: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
    return (
        <SessionProvider>
            <SettingsProvider>
                <MantineProvider theme={ theme }>
                    <Notifications />
                    { children }
                </MantineProvider>
            </SettingsProvider>
        </SessionProvider>
    )
}

export { Providers };