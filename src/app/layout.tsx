import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { Providers } from '@components/common';

export const metadata = {
    title: 'UBCV'
};

const RootLayout = ({ children }: Readonly<React.PropsWithChildren>) => {
    return (
        <html lang='en'>
        <head>
            <ColorSchemeScript />
            <link rel='shortcut icon' href='/favicon.svg' />
            <meta
                name='viewport'
                content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
            />
        </head>
        <body>
        <Providers>
            { children }
        </Providers>
        </body>
        </html>
    );
}


export default RootLayout