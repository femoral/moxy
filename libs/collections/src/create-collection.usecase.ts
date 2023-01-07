import { Collection } from './collection';
import { CreateCollection } from './repository/collection.repository';

export type CreateCollectionUseCase = {
  execute: (collection: Collection) => Promise<Collection>;
};

const makeCreateCollectionUseCase = ({
  createCollection,
}: {
  createCollection: CreateCollection;
}): CreateCollectionUseCase => {
  const execute = async (collection: Collection): Promise<Collection> => {
    await createCollection(collection);
    return collection;
  };

  return {
    execute,
  };
};

export { makeCreateCollectionUseCase };
