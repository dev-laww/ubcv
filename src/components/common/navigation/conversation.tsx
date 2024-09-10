'use client'

import classes from './component.module.css';
import React from 'react';
import Link from 'next/link';
import { Conversation as Item } from '@prisma/client';
import { useWindowLocation } from '@hooks';

interface ConversationProps {
    data: Item;
}

const Conversation: React.FC<Readonly<ConversationProps>> = ({ data }) => {
    const url = `/chat?thread=${ data.id }`;
    const windowLocation = useWindowLocation();

    // TODO: Add title prompt
    return (
        <Link
            className={ classes.link }
            data-active={ windowLocation === url || undefined }
            href={ url }
        >
            <span>{ data.id }</span>
        </Link>
    )
}


export { Conversation };