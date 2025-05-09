'use client'

import { AppShell, Divider, ScrollArea, Text } from '@mantine/core';
import { Logo } from '@components/common';
import classes from './component.module.css';
import { User } from '@components/common/buttons';
import { Session } from 'next-auth';
import React, { useEffect, useMemo, useState } from 'react';
import { Conversation as Model } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { all } from '@actions/conversation'
import { Conversation } from '@components/common/navigation/conversation';
import { DateTime } from 'luxon'

interface NavigationProps extends React.PropsWithChildren {
    session: Session;
    mobileNavOpened?: boolean;
    toggleMobileNav?: () => void;
}

const Navigation: React.FC<Readonly<NavigationProps>> = ({ session, mobileNavOpened, toggleMobileNav }) => {
    const [ conversations, setConversations ] = useState<Model[]>([]);
    const searchParams = useSearchParams();

    const ranges = useMemo(() => {
        const now = DateTime.now().startOf('day');
        return [
            { title: 'Today', test: (dt: DateTime) => dt.hasSame(now, 'day') },
            { title: 'Yesterday', test: (dt: DateTime) => dt.hasSame(now.minus({ days: 1 }), 'day') },
            {
                title: 'Last 7 Days',
                test: (dt: DateTime) => dt > now.minus({ days: 7 }) && dt <= now.minus({ days: 2 })
            },
            {
                title: 'Last 30 Days',
                test: (dt: DateTime) => dt > now.minus({ days: 30 }) && dt <= now.minus({ days: 7 })
            },
            { title: 'Older', test: () => true }
        ];
    }, []);

    const groups = useMemo(() => {
        const grouped: Record<string, Model[]> = {};

        ranges.forEach(({ title }) => (grouped[title] = []));

        conversations
        .slice()
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .forEach(conv => {
            const dt = DateTime.fromJSDate(conv.createdAt);
            const range = ranges.find(r => r.test(dt));
            grouped[range!.title].push(conv);
        });

        return grouped;
    }, [ conversations, ranges ]);

    useEffect(() => {
        all().then(setConversations);
    }, [ searchParams ]);

    return (
        <>
            <AppShell.Section className={ classes.header }>
                <Logo full c='white' />
            </AppShell.Section>

            <AppShell.Section grow component={ ScrollArea } scrollbarSize={ 5 } offsetScrollbars>
                { Object.entries(groups).map(([ title, items ]) =>
                    items.length ? (
                        <React.Fragment key={ title }>
                            <Divider size='xs' my={ 8 } label={ <Text fw={ 500 }>{ title }</Text> } />
                            { items.map(conv => (
                                <Conversation
                                    key={ conv.id }
                                    data={ conv }
                                    onClick={ () => mobileNavOpened && toggleMobileNav?.() }
                                />
                            )) }
                        </React.Fragment>
                    ) : null
                ) }
            </AppShell.Section>

            <AppShell.Section>
                <User session={ session } />
            </AppShell.Section>
        </>
    );
}

export { Navigation };
