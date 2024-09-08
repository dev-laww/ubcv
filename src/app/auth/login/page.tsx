import { Center, Overlay } from '@mantine/core';
import { Login as Page } from '@pages/auth'
import { VideoBackground } from '@components/common';

export const metadata = {
    title: 'Login'
}

const Login = () => {
    return (
        <VideoBackground src='/background.mp4' autoPlay loop muted>
            <Overlay zIndex={ 0 } blur={ 10 } />
            <Center h='100vh' p='md'>
                <Page />
            </Center>
        </VideoBackground>
    )
}


export default Login