import { Anchor, Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import Link from 'next/link';
import { PasswordStrength } from '@components/common/inputs';

const Register = () => {
    return (
        <form>
            <Stack>
                <TextInput
                    required
                    label='Username'
                    placeholder='Your username'
                    radius='md'
                />

                <PasswordStrength
                    required
                    label='Password'
                    placeholder='Your password'
                    radius='md'
                />

                <PasswordInput
                    required
                    label='Confirm Password'
                    placeholder='Your password'
                    radius='md'
                />

            </Stack>

            <Group justify='space-between' mt='xl'>
                <Anchor component={ Link } type='button' c='dimmed' href='/auth/register' size='xs'>
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