import { Center, Overlay } from '@mantine/core';
import { Register as Page } from '@pages/auth';
import { VideoBackground } from '@components/common';

export const metadata = {
    title: 'Register'
}

const Register = async () => {

    return (
        <VideoBackground src='/background.mp4' autoPlay loop muted>
            <Overlay zIndex={ -1 } blur={ 10 } />
            <Center h='100vh' p='md'>
                <Page />
            </Center>
        </VideoBackground>
    )
}


export default Register