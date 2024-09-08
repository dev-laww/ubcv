'use client'

import classes from './component.module.css';
import React from 'react';
import { usePathname } from 'next/navigation';

interface Conversation {
    link: string;
    label: string;
}

interface ConversationProps {
    item: Conversation;
}

const Conversation: React.FC<Readonly<ConversationProps>> = ({ item }) => {
    const pathname = usePathname();

    return (
        <a
            className={ classes.link }
            data-active={ pathname === item.link || undefined }
            href={ item.link }
            key={ item.label }
        >
            <span>{ item.label }</span>
        </a>
    )
}


export { Conversation };