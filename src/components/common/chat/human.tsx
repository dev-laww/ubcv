import React from 'react';
import { Flex, Paper, Text } from '@mantine/core';

interface HumanChatProps {
    content: string;
}

const HumanChat: React.FC<Readonly<HumanChatProps>> = ({ content }) => {
    return (
        <Flex justify='flex-end' w='100%' my='sm'>
            <Paper radius='lg' px='lg' py='sm' w='fit-content' maw='75%' bg='gray.1'>
                <Text fz='sm'>{ content }</Text>
            </Paper>
        </Flex>
    );
}

export { HumanChat };