import { Collection } from '../collection';

export type CreateCollection = (collection: Collection) => Promise<void>;
export type UpdateCollection = (collection: Collection) => Promise<void>;
export type GetCollection = (collectionId: string) => Promise<Collection>;
export type GetCollections = () => Promise<Collection[]>;
export type DeleteCollection = (collectionId: string) => Promise<void>;
