import React from 'react';
import { ActionIcon, TextInput } from '@mantine/core';
import { IconSend2 } from '@tabler/icons-react';

const Message: React.FC = () => {
    return (
        <form>
            <TextInput
                placeholder='Type a message'
                rightSection={ (
                    <ActionIcon color='puceRed' variant='transparent' type='submit'>
                        <IconSend2 />
                    </ActionIcon>
                ) }
            />
        </form>
    )
}

export { Message }