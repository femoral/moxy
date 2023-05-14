import { Collection } from './collection';
import { GetCollection } from './repository/collection.repository';

export type GetCollectionUseCase = {
  execute: (collectionId: string) => Promise<Collection>;
};

export const makeGetCollectionUseCase = (getCollectionRepository: {
  getCollection: GetCollection;
}): GetCollectionUseCase => {
  const execute = async (collectionId: string): Promise<Collection> =>
    await getCollectionRepository.getCollection(collectionId);

  return {
    execute,
  };
};
