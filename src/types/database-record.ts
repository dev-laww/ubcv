interface DBRecord {
    createdAt: Date
    updatedAt: Date
}

export type DatabaseRecord<T extends DBRecord> = Omit<T, 'createdAt' | 'updatedAt'>