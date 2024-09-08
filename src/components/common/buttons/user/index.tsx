'use client'

import { Avatar, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconLogout, IconSettings } from '@tabler/icons-react';
import classes from './component.module.css';
import React from 'react';
import { Session } from 'next-auth';
import { useHover } from '@mantine/hooks';
import { signOut } from 'next-auth/react';

interface UserButtonProps {
    session: Session;
}

const User: React.FC<Readonly<UserButtonProps>> = ({ session }) => {
    const { ref, hovered } = useHover();

    return (
        <Menu width={ 300 }>
            <Menu.Target>
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

                                <Text className={ classes.email } fz={ 10 }>
                                    { session.user?.email }
                                </Text>
                            </div>

                            <IconChevronRight style={ { width: rem(14), height: rem(14) } } stroke={ 1.5 } />
                        </Group>
                    </UnstyledButton>
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>{ session.user?.email }</Menu.Label>
                <Menu.Divider />
                <Menu.Item leftSection={ <IconSettings style={ { width: rem(14), height: rem(14) } } /> }>
                    Settings
                </Menu.Item>
                <Menu.Item
                    leftSection={ <IconLogout style={ { width: rem(14), height: rem(14) } } /> }
                    onClick={ async () => await signOut({ callbackUrl: '/auth/login' }) }
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export { User };