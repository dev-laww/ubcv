import React from 'react';
import { Chat } from '@components/layouts';
import { auth } from '@lib/auth';

const Layout: React.FC<Readonly<React.PropsWithChildren>> = async ({ children }) => {
    const session = await auth()
    return (
        <Chat session={ session! }>
            { children }
        </Chat>
    )
}


export default Layout;