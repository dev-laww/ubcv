'use client'

import React from 'react';
import classes from './page.module.css'
import { Illustration } from '@pages/not-found/illustration';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter()

    return (
        <Group component={ Container } h="100vh" grow>
            <div className={ classes.inner }>
                <Illustration className={ classes.image }/>
                <div className={ classes.content }>
                    <Title className={ classes.title }>Nothing to see here</Title>
                    <Text c="dimmed" size="lg" ta="center" className={ classes.description }>
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Group justify="center">
                        <Button size="md" onClick={ () => router.back() }>Take me back to previous page</Button>
                    </Group>
                </div>
            </div>
        </Group>
    )
}

export { NotFound }