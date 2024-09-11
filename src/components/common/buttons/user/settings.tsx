'use client'

import { useDisclosure, useHover, useMediaQuery } from '@mantine/hooks'
import { Box, Button, Group, Modal, rem, Select, Stack, Tabs, Text, TextInput } from '@mantine/core'
import { IconSettings, IconUserCog } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import './component.css'
import { useSettings } from '@hooks';
import { matches as valid, useForm } from '@mantine/form';
import { Settings as SettingsType } from '@types';
import { notifications } from '@mantine/notifications';
import { Voice } from '@prisma/client';
import { SettingsContextType } from '@context';


const voices = [
    { value: Voice.ALLOY, label: 'Alloy' },
    { value: Voice.ECHO, label: 'Echo' },
    { value: Voice.FABLE, label: 'Fable' },
    { value: Voice.NOVA, label: 'Nova' },
    { value: Voice.ONYX, label: 'Onyx' },
    { value: Voice.SHIMMER, label: 'Shimmer' }
]


const Settings = () => {
    const [ opened, { open, close } ] = useDisclosure()
    const { ref, hovered } = useHover()
    const matches = useMediaQuery('(min-width: 62em)')
    const { settings, update, deleteAllChat } = useSettings() as SettingsContextType
    const [ loading, setLoading ] = useState(false)
    const form = useForm({
        initialValues: {
            id: settings?.id || '',
            avatar: settings?.avatar || '',
            voice: settings?.voice || 'ALLOY'
        },
        validate: {
            avatar: valid(/https:\/\/models\.readyplayer\.me\/[a-zA-Z0-9]+\.glb|avatars\/avatar\.glb/, 'Invalid avatar URL')
        }
    })

    useEffect(() => form.setValues(settings!), [ settings ])


    const submit = async (values: SettingsType) => {
        if (JSON.stringify(values) === JSON.stringify(settings)) return

        const id = notifications.show({
            title: 'Updating settings...',
            message: 'Please wait...',
            autoClose: false,
            loading: true
        })

        setLoading(true)

        await update(values)

        setLoading(false)

        notifications.update({
            id,
            title: 'Settings updated',
            message: 'Your settings have been updated',
            autoClose: 2000,
            loading: false
        })
    }

    const deleteChats = async () => {
        const id = notifications.show({
            title: 'Deleting chats...',
            message: 'Please wait...',
            autoClose: false,
            loading: true
        })

        await deleteAllChat()

        notifications.update({
            id,
            title: 'Chats deleted',
            message: 'All chats have been deleted',
            autoClose: 2000,
            loading: false
        })
    }

    return (
        <>
            <Modal
                c='puceRed'
                opened={ opened }
                onClose={ close }
                title='Settings'
                centered
                size='xl'
                mih='100%'
            >
                <Tabs defaultValue='general' orientation={ matches ? 'vertical' : 'horizontal' } h='100%'>
                    <Tabs.List grow={ !matches }>
                        <Tabs.Tab
                            value='general'
                            leftSection={ <IconSettings stroke={ 1 } /> }
                        >
                            General
                        </Tabs.Tab>
                        <Tabs.Tab
                            value='personalization'
                            leftSection={ <IconUserCog stroke={ 1 } /> }
                        >
                            Personalization
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value='general' px='sm' py={ !matches && 'sm' || undefined }>
                        <Group pl='sm' justify='space-between'>
                            <Text>Delete all chats</Text>
                            <Button
                                onClick={ deleteChats }
                                color='puceRed'
                                radius='xl'
                            >
                                Delete Chats
                            </Button>
                        </Group>
                    </Tabs.Panel>
                    <Tabs.Panel value='personalization' px='sm' py={ !matches && 'sm' || undefined }>
                        <form onSubmit={ form.onSubmit(submit) } style={ { height: '100%' } }>
                            <Stack justify='space-between' h='100%'>
                                <Stack>
                                    <Group pl='sm' justify='space-between'>
                                        <Text>Avatar</Text>
                                        <TextInput
                                            w='40%'
                                            { ...form.getInputProps('avatar') }
                                        />
                                    </Group>
                                    <Group pl='sm' justify='space-between'>
                                        <Text>Voice</Text>
                                        <Select
                                            data={ voices }
                                            w='40%'
                                            { ...form.getInputProps('voice') }
                                        />
                                    </Group>
                                </Stack>

                                <Button
                                    type='submit'
                                    style={ { alignSelf: 'flex-end' } }
                                    loading={ loading }
                                >
                                    Save
                                </Button>
                            </Stack>
                        </form>
                    </Tabs.Panel>
                </Tabs>
            </Modal>

            <Box w='100%' ref={ ref } bg={ hovered ? 'gray.1' : undefined } onClick={ open }>
                <Button
                    leftSection={ <IconSettings style={ { width: rem(14), height: rem(14) } } /> }
                    variant='transparent'
                    fw={ 400 }
                >
                    Settings
                </Button>
            </Box>
        </>
    )
}


export { Settings }