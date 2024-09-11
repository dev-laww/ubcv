'use client'

import { Settings } from '@types';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { get, update as dbUpdate } from '@actions/settings';

export interface SettingsContextType {
    settings: Settings | null;
    update: (settings: Settings) => Promise<void>;
}


export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);


export const SettingsProvider: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
    const [ settings, setSettings ] = useState<Settings | null>(null)
    const update = useCallback(async (settings: Settings) => {
        await dbUpdate(settings)

        setSettings(settings)
    }, [])

    useEffect(() => {
        get().then(setSettings)
    }, []);


    return (
        <SettingsContext.Provider value={ { settings, update } }>
            { children }
        </SettingsContext.Provider>
    )
}