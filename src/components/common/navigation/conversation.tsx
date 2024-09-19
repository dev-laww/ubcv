'use client'

import classes from './component.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Text } from '@mantine/core';
import { Conversation as Item } from '@prisma/client';
import { useWindowLocation } from '@hooks';
import { generateTitle } from '@actions/conversation';

interface ConversationProps {
    data: Item;
    onClick?: () => void;
}

const Conversation: React.FC<Readonly<ConversationProps>> = ({ data, onClick }) => {
    const [ conversation, setConversation ] = useState(data);
    const windowLocation = useWindowLocation();

    useEffect(() => {
        if (conversation.title) return;

        generateTitle(conversation.id).then(title => setConversation(prev => ({ ...prev, title })))
    }, []);

    return (
        <Box
            component={ Link }
            className={ classes.link }
            data-active={ windowLocation === `/chat?thread=${ data.id }` || undefined }
            onClick={ onClick }
            href={ `/chat?thread=${ data.id }` }
        >
            <Text w={ 280 } truncate='end'>
                { conversation.title ? conversation.title : 'New Chat' }
            </Text>
        </Box>
    )
}


export { Conversation };