import { useContext } from 'react';
import { SettingsContext } from '@context';

export const useSettings = () => useContext(SettingsContext)