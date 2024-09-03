'use client'

import { Anchor, Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import Link from 'next/link';
import { hasLength, useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter()
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: hasLength({ min: 4 }, 'Email is required')
        }
    })


    const login = async (data: typeof form.values) => {
        const id = notifications.show({
            title: 'Logging in...',
            message: 'Please wait...',
            autoClose: false,
            loading: true
        })

        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (!!res?.error) {
            notifications.update({
                id,
                title: 'Failed to login',
                message: 'Invalid email or password',
                color: 'red',
                loading: false,
                autoClose: 2000
            })
            return
        }

        notifications.update({
            id,
            title: 'Logged in',
            message: 'You have been logged in',
            loading: false,
            color: 'green',
            autoClose: 2000
        })
        router.push('/')
    }

    return (
        <form onSubmit={ form.onSubmit(login) }>
            <Stack>
                <TextInput
                    required
                    label='Email or username'
                    placeholder='Your email or username'
                    radius='md'
                    { ...form.getInputProps('email') }
                />

                <PasswordInput
                    required
                    label='Password'
                    placeholder='Your password'
                    radius='md'
                    { ...form.getInputProps('password') }
                />

            </Stack>

            <Group justify='space-between' mt='xl'>
                <Anchor component={ Link } type='button' c='dimmed' href='/auth/register' size='xs'>
                    Don&lsquo;t have an account? Register
                </Anchor>
                <Button type='submit' radius='xl'>
                    Login
                </Button>
            </Group>
        </form>
    )
}

export { Login };