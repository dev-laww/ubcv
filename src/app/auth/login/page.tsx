import { Center } from '@mantine/core';
import { Login as Page } from '@pages/auth'

export const metadata = {
    title: 'Register'
}

const Login = () => {
    return (
        <Center h='100vh' p='md'>
            <Page />
        </Center>
    )
}


export default Login