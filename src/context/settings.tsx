'use client'

import { Settings } from '@types';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { deleteAllChat as deleteChats, get, update as dbUpdate } from '@actions/settings';

export interface SettingsContextType {
    settings: Settings | null
    update: (settings: Settings) => Promise<void>
    deleteAllChat: () => Promise<void>
}


export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);


export const SettingsProvider: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
    const [ settings, setSettings ] = useState<Settings | null>(null)
    const update = useCallback(async (settings: Settings) => {
        await dbUpdate(settings)

        setSettings(settings)
    }, [])

    const deleteAllChat = useCallback(deleteChats, [])

    useEffect(() => {
        get().then(setSettings)
    }, []);


    return (
        <SettingsContext.Provider value={ { settings, update, deleteAllChat } }>
            { children }
        </SettingsContext.Provider>
    )
}