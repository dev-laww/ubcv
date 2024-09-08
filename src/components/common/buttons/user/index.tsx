'use client'

import { Avatar, Group, rem, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './component.module.css';
import React from 'react';
import { Session } from 'next-auth';
import { useHover } from '@mantine/hooks';

interface UserButtonProps {
    session: Session;
}

const User: React.FC<Readonly<UserButtonProps>> = ({ session }) => {
    const { ref, hovered } = useHover();

    console.log(hovered)

    return (
        <div ref={ ref }>
            <UnstyledButton className={ classes.user }>
                <Group>
                    <Avatar
                        className={ classes.avatar }
                        name={ session.user?.name || '' }
                        color={ hovered ? 'puceRed' : 'puceRed.1' }
                        src={ session.user?.image || '' }
                        radius='xl'
                    />

                    <div style={ { flex: 1 } }>
                        <Text size='sm' fw={ 500 }>
                            { session.user?.name }
                        </Text>

                        <Text className={ classes.email } size='xs'>
                            { session.user?.email }
                        </Text>
                    </div>

                    <IconChevronRight style={ { width: rem(14), height: rem(14) } } stroke={ 1.5 } />
                </Group>
            </UnstyledButton>
        </div>
    );
}

export { User };