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
                placeholder='Type a message'
                rightSection={ (
                    <ActionIcon color='puceRed' variant='transparent' type='submit' loading={ loading }>
                        <IconSend2 />
                    </ActionIcon>
                ) }
            />
        </form>
    )
}

export { Message }