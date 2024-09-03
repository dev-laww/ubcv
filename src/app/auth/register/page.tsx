import { Center } from '@mantine/core';
import { Register as Page } from '@pages/auth';
import { auth } from '@lib/auth';

export const metadata = {
    title: 'Register'
}

const Register = async () => {

    return (
        <Center mih='100vh' p='md'>
            <Page />
        </Center>
    )
}


export default Register