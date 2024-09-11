import { DatabaseRecord } from './database-record';
import { UserSettings } from '@prisma/client';

export type Settings = Omit<DatabaseRecord<UserSettings>, 'userId'>