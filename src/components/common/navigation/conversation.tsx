'use client'

import classes from './component.module.css';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Conversation as Item } from '@prisma/client';

interface ConversationProps {
    data: Item;
}

const Conversation: React.FC<Readonly<ConversationProps>> = ({ data }) => {
    const pathname = usePathname();
    const url = `/chat?thread=${ data.id }`;

    // TODO: Add title prompt
    return (
        <a
            className={ classes.link }
            data-active={ pathname === url || undefined }
            href={ url }
        >
            <span>{ data.id }</span>
        </a>
    )
}


export { Conversation };