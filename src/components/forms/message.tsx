'use client'

import React, { useState } from 'react';
import { ActionIcon, TextInput } from '@mantine/core';
import { IconSend2 } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

interface MessageProps {
    send: (input: string) => Promise<void>
}

const Message: React.FC<Readonly<MessageProps>> = ({ send }) => {
    const [ loading, setLoading ] = useState(false)
    const form = useForm({
        initialValues: { message: '' }
    })

    const submit = async (values: typeof form.values) => {
        if (!values.message || loading) return

        form.reset()
        setLoading(true)

        await send(values.message)

        setLoading(false)
    }

    return (
        <form onSubmit={ form.onSubmit(submit) }>
            <TextInput
                { ...form.getInputProps('message') }
                autoComplete='off'
                radius='xl'
                size='md'
                placeholder='Type a message'
                rightSection={ (
                    <ActionIcon
                        color={ form.values.message.length > 0 || loading ? 'puceRed' : 'dimmed' }
                        style={ { pointerEvents: form.values.message.length > 0 ? 'auto' : 'none' } }
                        variant='transparent'
                        type='submit'
                        loading={ loading }
                    >
                        <IconSend2 stroke={ 1.5 } />
                    </ActionIcon>
                ) }
            />
        </form>
    )
}

export { Message }