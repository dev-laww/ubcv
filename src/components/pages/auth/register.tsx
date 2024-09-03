import { Divider, Group, Paper, Text } from '@mantine/core';
import { Google } from '@components/common/buttons';
import { Register as Form } from '@components/forms';
import { auth, signIn } from '@lib/auth';

const Register = async () => {
    const action = async () => {
        'use server'

        await signIn('google');
    }
    const session = await auth()

    return (
        <Paper radius='md' p='xl' withBorder miw={ { base: '100%', sm: 600 } }>
            <Text size='lg' fw={ 500 }>
                Welcome to UBCV, register with
            </Text>

            <form action={ action }>
                <Group grow mb='md' mt='md'>
                    <Google radius='xl' type='submit'>Google</Google>
                </Group>
            </form>

            <Divider label='Or continue with email' labelPosition='center' my='lg' />

            <Form session={ session } />
        </Paper>
    )
}

export { Register };