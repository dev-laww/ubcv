'use client';

import React from 'react';
import { AppShell, Group } from '@mantine/core';
import { Logo } from '@components/common'

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <AppShell
            padding='md'
            header={ { height: 60 } }
        >
            <AppShell.Header bg='puceRed'>
                <Group>
                    <Logo width={ 60 } height={ 60 } />
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                { children }
            </AppShell.Main>
        </AppShell>
    );
}