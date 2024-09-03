import { Divider, Group, Paper, Text } from '@mantine/core';
import { Google } from '@components/common/buttons';
import { Login as Form } from '@components/forms';

const Login = () => {
    return (
        <Paper radius='md' p='xl' withBorder>
            <Text size='lg' fw={ 500 }>
                Welcome to UBCV, login with
            </Text>

            <Group grow mb='md' mt='md'>
                <Google radius='xl'>Google</Google>
            </Group>

            <Divider label='Or continue with email' labelPosition='center' my='lg' />

            <Form />
        </Paper>
    )
}

export { Login };