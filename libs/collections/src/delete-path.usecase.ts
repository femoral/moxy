import {
  GetCollection,
  UpdateCollection,
} from "./repository/collection.repository";

export type DeletePathUseCase = {
  execute: (collectionId: string, pathId: string) => Promise<void>;
};

export const makeDeletePathUseCase = (collectionRepository: {
  getCollection: GetCollection;
  updateCollection: UpdateCollection;
}): DeletePathUseCase => {
  const execute = async (
    collectionId: string,
    pathId: string
  ): Promise<void> => {
    const collection = await collectionRepository.getCollection(collectionId);
    collection.removePath(pathId);

    await collectionRepository.updateCollection(collection);
  };

  return {
    execute,
  };
};
