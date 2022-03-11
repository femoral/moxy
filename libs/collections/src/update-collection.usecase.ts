import { Collection } from './collection';
import { UpdateCollection } from './repository/collection.repository';

export type UpdateCollectionUseCase = {
  execute: (collection: Collection) => Promise<void>;
};

export const makeUpdateCollectionUseCase = (collectionRepository: {
  updateCollection: UpdateCollection;
}): UpdateCollectionUseCase => {
  const execute = async (collection: Collection): Promise<void> => {
    await collectionRepository.updateCollection(collection);
  };

  return {
    execute,
  };
};
