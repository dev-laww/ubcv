import { AppShell, ScrollArea } from '@mantine/core';
import { Logo } from '@components/common';
import classes from './component.module.css';
import { User } from '@components/common/buttons';
import { Session } from 'next-auth';
import React from 'react';
import { Conversation } from '@components/common/navigation/conversation';

const data = [
    { link: '', label: 'Notifications' },
    { link: '', label: 'Billing' },
    { link: '', label: 'Security' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'SSH Keys' },
    { link: '', label: 'Databases' }

];

interface NavigationProps extends React.PropsWithChildren {
    session: Session;
}

const Navigation: React.FC<Readonly<NavigationProps>> = ({ session }) => {
    const links = data.map(item => <Conversation item={ item } key={ item.label } />);
    return (
        <>
            <AppShell.Section className={ classes.header }>
                <Logo full c='white' />
            </AppShell.Section>

            <AppShell.Section grow component={ ScrollArea } scrollbarSize={ 5 } offsetScrollbars>
                { links }
            </AppShell.Section>

            <AppShell.Section>
                <User session={ session } />
            </AppShell.Section>
        </>
    );
}

export { Navigation };
