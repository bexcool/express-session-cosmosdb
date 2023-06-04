import type { Session } from 'express-session';
import { Store } from 'express-session';
export interface ICosmosSessionProviderOptions {
    endpoint: string;
    key: string;
    ttl?: number;
    database?: string;
    collection?: string;
}
export default class CosmosSessionStore extends Store {
    private _options;
    private _client;
    private _initialized;
    private _database;
    private _collection;
    constructor(options: ICosmosSessionProviderOptions);
    initialize(): Promise<void>;
    get: (sid: string, callback: any) => void;
    destroy: (sid: string, callback: any) => void;
    set: (sid: string, session: Session, callback: any) => void;
    touch: (sid: string, session: Session, callback: any) => void;
    private throwIfNotInitialized;
}
