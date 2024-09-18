'use client'

import { AppShell, ScrollArea } from '@mantine/core';
import { Logo } from '@components/common';
import classes from './component.module.css';
import { User } from '@components/common/buttons';
import { Session } from 'next-auth';
import React, { useEffect, useState } from 'react';
import { Conversation as Model } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { all } from '@actions/conversation'
import { Conversation } from '@components/common/navigation/conversation';

interface NavigationProps extends React.PropsWithChildren {
    session: Session;
    mobileNavOpened?: boolean;
    toggleMobileNav?: () => void;
}

const Navigation: React.FC<Readonly<NavigationProps>> = ({ session, mobileNavOpened, toggleMobileNav }) => {
    const [ conversations, setConversations ] = useState<Model[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        all().then(setConversations);
    }, [ searchParams ]);

    return (
        <>
            <AppShell.Section className={ classes.header }>
                <Logo full c='white' />
            </AppShell.Section>

            <AppShell.Section grow component={ ScrollArea } scrollbarSize={ 5 } offsetScrollbars>
                { conversations.map(conversation => {
                    const click = () => {
                        mobileNavOpened && toggleMobileNav!();
                    }
                    return <Conversation key={ conversation.id } data={ conversation } onClick={ click } />
                }) }
            </AppShell.Section>

            <AppShell.Section>
                <User session={ session } />
            </AppShell.Section>
        </>
    );
}

export { Navigation };
