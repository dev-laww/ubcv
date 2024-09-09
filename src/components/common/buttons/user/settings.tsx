'use client'

import { useDisclosure, useHover, useMediaQuery } from '@mantine/hooks'
import { Box, Button, Group, Modal, rem, Select, Stack, Tabs, Text, TextInput } from '@mantine/core'
import { IconSettings, IconUserCog } from '@tabler/icons-react';
import React from 'react';
import './component.css'

const Settings = () => {
    const [ opened, { open, close } ] = useDisclosure()
    const { ref, hovered } = useHover()
    const matches = useMediaQuery('(min-width: 62em)')
    const settings = {
        voice: 'default',
        model: 'default'
    } // TODO: Fetch settings from the server

    return (
        <>
            <Modal
                c='puceRed'
                opened={ opened }
                onClose={ close }
                title='Settings'
                zIndex={ 999 }
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
                            <Button color='puceRed' radius='xl'>Delete Chats</Button>
                        </Group>
                    </Tabs.Panel>
                    <Tabs.Panel value='personalization' px='sm' py={ !matches && 'sm' || undefined }>
                        <Stack justify='space-between' h='100%'>
                            <Stack>
                                <Group pl='sm' justify='space-between'>
                                    <Text>Avatar</Text>
                                    <TextInput value={ settings.model as string } w='40%' />
                                </Group>
                                <Group pl='sm' justify='space-between'>
                                    <Text>Voice</Text>
                                    <Select
                                        data={ [
                                            { value: 'default', label: 'Default' }
                                        ] }
                                        value={ settings.voice }
                                        w='40%'
                                    />
                                </Group>
                            </Stack>

                            <Button style={ { alignSelf: 'flex-end' } }>Save</Button>
                        </Stack>
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