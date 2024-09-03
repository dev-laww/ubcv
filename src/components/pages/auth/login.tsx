import { Divider, Group, Paper, Text } from '@mantine/core';
import { Google } from '@components/common/buttons';
import { Login as Form } from '@components/forms';
import { signIn } from '@lib/auth';

const Login = () => {
    const action = async () => {
        'use server'

        await signIn('google', { redirectTo: '/' });
    }

    return (
        <Paper radius='md' p='xl' withBorder miw={ { base: '100%', sm: 400 } }>
            <Text size='lg' fw={ 500 }>
                Welcome to UBCV, login with
            </Text>

            <form action={ action }>
                <Group grow mb='md' mt='md'>
                    <Google radius='xl' type='submit'>Google</Google>
                </Group>
            </form>

            <Divider label='Or continue with email' labelPosition='center' my='lg' />

            <Form />
        </Paper>
    )
}

export { Login };