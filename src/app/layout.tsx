import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { Providers } from '@components/common';

export const metadata = {
    title: {
        default: 'E - UBCV',
        template: '%s | UBCV'
    }
};

const RootLayout = ({ children }: Readonly<React.PropsWithChildren>) => {
    return (
        <html lang='en'>
        <head>
            <ColorSchemeScript />
            <link rel='shortcut icon' href='/logo.svg' />
            {/*<link rel='stylesheet' href='https://cdn.oaistatic.com/assets/root-dunwnenm.css' />*/}
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