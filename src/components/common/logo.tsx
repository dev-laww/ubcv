import { Box, Group, MantineColor, StyleProp, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

interface LogoProps {
    className?: string;
    full?: boolean;
    c?: StyleProp<MantineColor>
}

const Logo: React.FC<Readonly<LogoProps>> = ({ className, full, c }) => {
    return (
        <Group className={ className } grow w='100%' c={ c }>
            <Box maw={ full && '30%' || undefined }>
                <Image src='/logo.svg' alt='logo' width={ 100 } height={ 100 } />
            </Box>
            { full && <Title order={ 3 }>E - UBCV</Title> }
        </Group>
    )
}

export { Logo }