import { Collection } from './collection';
import { GetCollections } from './repository/collection.repository';

export type GetCollectionsUseCase = { execute: () => Promise<Collection[]> };

export const makeGetCollectionsUseCase = (collectionRepository: {
  getCollections: GetCollections;
}): GetCollectionsUseCase => {
  const execute = async (): Promise<Collection[]> => await collectionRepository.getCollections();

  return { execute };
};
