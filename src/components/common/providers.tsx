import React from 'react';

import { MantineProvider } from '@mantine/core';
import { theme } from '@lib';

const Providers: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
    return (
        <MantineProvider theme={ theme }>
            { children }
        </MantineProvider>
    )
}

export { Providers };