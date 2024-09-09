'use client'

import { Avatar, Box, Button, Divider, Group, Paper, rem, Text, Transition, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';
import classes from './component.module.css';
import React from 'react';
import { Session } from 'next-auth';
import { useClickOutside, useDisclosure, useHover } from '@mantine/hooks';
import { signOut } from 'next-auth/react';
import { Settings } from '@components/common/buttons/user/settings';

interface UserButtonProps {
    session: Session;
}

const scaleY = {
    in: { opacity: 1, transform: 'scaleY(1)' },
    out: { opacity: 0, transform: 'scaleY(0)' },
    common: { transformOrigin: 'bottom' },
    transitionProperty: 'transform, opacity'
};


const User: React.FC<Readonly<UserButtonProps>> = ({ session }) => {
    const { ref, hovered } = useHover();
    const [ opened, { toggle, close } ] = useDisclosure(false);
    const clickOutsideRef = useClickOutside(() => !hovered && close() || undefined);

    return (
        <Box pos='relative'>
            <div ref={ ref }>
                <UnstyledButton className={ classes.user } onClick={ toggle }>
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

            <Transition
                mounted={ opened }
                transition={ scaleY }
                duration={ 200 }
                timingFunction='ease'
                keepMounted
            >
                { (transitionStyle) => (
                    <Paper
                        shadow='md'
                        p='sm'
                        pos='absolute'
                        bottom={ ref.current?.clientHeight || 0 }
                        left={ 0 }
                        right={ 0 }
                        ref={ clickOutsideRef }
                        style={ { ...transitionStyle, zIndex: 1 } }
                    >
                        <Text c='puceRed' fz='xs'>{ session.user?.email }</Text>
                        <Divider my='xs' />
                        <Settings />
                        <Button
                            leftSection={ <IconLogout style={ { width: rem(14), height: rem(14) } } /> }
                            onClick={ async () => await signOut({ callbackUrl: '/auth/login' }) }
                            c='puceRed'
                            variant='transparent'
                            fw={ 400 }
                        >
                            Logout
                        </Button>
                    </Paper>
                ) }
            </Transition>
        </Box>
    );
}

export { User };
