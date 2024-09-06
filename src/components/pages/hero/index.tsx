import { Box, Button, Center, Container, Overlay, Text, Title } from '@mantine/core';
import classes from './page.module.css';
import React from 'react';
import Link from 'next/link';
import { VideoBackground } from '@components/common';

const Hero: React.FC = () => {
    return (
        <Box mih='100vh'>
            <VideoBackground src='/background.mp4' autoPlay loop muted>
                <Overlay
                    gradient='linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)'
                    opacity={ 1 }
                    zIndex={ -1 }
                    blur={ 10 }
                />
                <Container className={ classes.container } size='md'>
                    <Center>
                        <Box>
                            <Title className={ classes.title }>E-UBCV</Title>
                            <Text className={ classes.description } size='xl' mt='xl'>

                                Introducing the next-generation AI chatbot for the University of Batangas, designed to
                                embody and promote the institution&lsquo;s core values. This intelligent assistant not only
                                answers questions but also engages students and faculty in meaningful conversations,
                                fostering a deeper connection to UB&lsquo;s principles of integrity, excellence, and social
                                responsibility
                            </Text>


                            <Button
                                component={ Link } href='/auth/register' size='xl' radius='xl'
                                className={ classes.control }
                            >
                                Get started
                            </Button>
                        </Box>
                    </Center>
                </Container>
            </VideoBackground>
        </Box>
    );
}


export {
    Hero
}
