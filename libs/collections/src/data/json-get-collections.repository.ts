import { Collection } from '../collection';
import { promises as fs } from 'fs';
import { GetCollection, GetCollections } from '../repository/collection.repository';

const makeJsonGetCollectionsRepository =
  ({
    collectionsBasePath,
    getCollection,
  }: {
    collectionsBasePath: string;
    getCollection: GetCollection;
  }): GetCollections =>
  async (): Promise<Collection[]> =>
    Promise.all(
      (await fs.readdir(collectionsBasePath, { withFileTypes: true }))
        .filter((dirEntry) => dirEntry.isDirectory() && dirEntry.name[0] !== '.')
        .map((dirEntry) => getCollection(dirEntry.name))
    );
export { makeJsonGetCollectionsRepository };
