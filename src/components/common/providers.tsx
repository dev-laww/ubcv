import React from 'react';

import { MantineProvider } from '@mantine/core';
import { theme } from '@lib';
import { SessionProvider } from 'next-auth/react';

const Providers: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
    return (
        <SessionProvider>
            <MantineProvider theme={ theme }>
                { children }
            </MantineProvider>
        </SessionProvider>
    )
}

export { Providers };