'use client'

import React, { useState } from 'react';
import { ActionIcon, TextInput } from '@mantine/core';
import { IconSend2 } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { create, message } from '@actions/message';

const Message: React.FC = () => {
    const [ loading, setLoading ] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    const form = useForm({
        initialValues: { message: '' }
    })

    const submit = async (values: typeof form.values) => {
        if (!values.message || loading) return

        form.reset()
        console.log(values)
        setLoading(true)

        try {
            const thread = searchParams.get('thread')

            let id: string = ''

            if (!thread) {
                id = await create()

                router.replace(`/chat?thread=${ id }`)
            }

            const response = await message({ thread: thread || id, input: values.message })

            console.log(response)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
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