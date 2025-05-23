'use client'

import { Anchor, Button, Checkbox, Group, Loader, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import Link from 'next/link';
import { PasswordStrength } from '@components/common/inputs';
import React from 'react';
import { Session } from 'next-auth';
import { hasLength, matches, useField, useForm } from '@mantine/form';
import { available, register } from '@lib/actions/register';
import { getStrength } from '@utils/password';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

interface RegisterProps {
    session: Session | null
}

const Register = ({ session }: RegisterProps) => {
    const router = useRouter()
    const form = useForm({
        initialValues: {
            name: session?.user?.name,
            email: session?.user?.email,
            password: '',
            confirmPassword: '',
            tos: false
        },
        validate: {
            name: hasLength({ min: 1, max: 255 }, 'Name must be 2-10 characters long'),
            email: matches(/^[a-zA-Z0-9._%+-]+@ub.edu.ph$/, 'Email must be valid email'),
            password: value => getStrength(value) !== 100 && 'Password is too weak',
            tos: value => !value && 'You must accept the terms of service',
            confirmPassword: (value, values) => value !== values.password && 'Passwords do not match'
        }
    })
    const username = useField({
        initialValue: session?.user?.username || '',
        validateOnChange: true,
        validate: async value => hasLength({ min: 3, max: 255 }, 'Username must be 3-255 characters long')(value)
            || (await available(value) ? undefined : 'Username is already taken')
            || matches(/^[a-zA-Z0-9_.]+$/, 'Username can only contain letters, numbers, periods, and underscores')(value)
    })

    const submit = async (values: typeof form.values) => {
        if (username.error) return

        const notification = notifications.show({
            title: 'Registering...',
            message: 'Please wait while we register your account',
            autoClose: false,
            loading: true
        })

        const { tos, ...data } = values
        const error = await register({ ...data, username: username.getValue() })

        if (error) {
            notifications.update({
                id: notification,
                title: 'Registration failed',
                message: error,
                autoClose: 2000,
                loading: false,
                color: 'red'
            })

            return
        }

        notifications.update({
            id: notification,
            title: 'Registration successful',
            message: 'You have successfully registered your account',
            autoClose: 2000,
            loading: false
        })

        session ? router.push('/chat') : router.push('/auth/login')
    };

    return (
        <form onSubmit={ form.onSubmit(submit) }>
            <Stack>
                <TextInput
                    withAsterisk
                    label='Full Name'
                    placeholder='Your full name'
                    radius='md'
                    disabled={ !!session?.user?.name }
                    { ...form.getInputProps('name') }
                />

                <TextInput
                    withAsterisk
                    label='Email'
                    placeholder='Your email'
                    radius='md'
                    disabled={ !!session?.user?.email }
                    { ...form.getInputProps('email') }
                />

                <TextInput
                    withAsterisk
                    label='Username'
                    placeholder='Your username'
                    radius='md'
                    { ...username.getInputProps() }
                    rightSection={ username.isValidating ? <Loader size={ 18 } /> : null }
                />

                <Group grow justify='space-between'>
                    <PasswordStrength
                        withAsterisk
                        label='Password'
                        placeholder='Your password'
                        radius='md'
                        { ...form.getInputProps('password') }
                    />

                    <PasswordInput
                        style={ { alignSelf: 'start' } }
                        withAsterisk
                        label='Confirm Password'
                        placeholder='Your password'
                        radius='md'
                        { ...form.getInputProps('confirmPassword') }
                    />
                </Group>

                <Checkbox
                    { ...form.getInputProps('tos') }
                    defaultChecked
                    size='xs'
                    label={
                        <Text size='xs' c='dimmed'>
                            By continuing, I accept to E-UBCV&#39;s{ ' ' }
                            <Anchor component={ Link } href='/terms-of-service'>
                                Terms of Service
                            </Anchor>
                            &nbsp;and I acknowledge the E-UBCV&#39;s&nbsp;
                            <Anchor component={ Link } href='/privacy-policy'>
                                Privacy Policy
                            </Anchor>
                        </Text>
                    }
                />
            </Stack>

            <Group justify='space-between' mt='xl'>
                <Anchor component={ Link } type='button' c='dimmed' href='/auth/login' size='xs'>
                    Already have an account? Login
                </Anchor>
                <Button type='submit' radius='xl'>
                    Register
                </Button>
            </Group>
        </form>
    )
}

export { Register };