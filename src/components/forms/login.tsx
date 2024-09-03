import { Anchor, Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import Link from 'next/link';

const Login = () => {
    return (
        <form>
            <Stack>
                <TextInput
                    required
                    label='Email'
                    placeholder='hello@mantine.dev'
                    radius='md'
                />

                <PasswordInput
                    required
                    label='Password'
                    placeholder='Your password'
                    radius='md'
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