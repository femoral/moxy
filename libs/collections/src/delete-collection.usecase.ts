import { DeleteCollection } from "./repository/collection.repository";

export type DeleteCollectionUseCase = {
  execute: (name: string) => Promise<void>;
};

export const makeDeleteCollectionUseCase = ({
  deleteCollection,
}: {
  deleteCollection: DeleteCollection;
}): DeleteCollectionUseCase => {
  const execute = async (name: string) => {
    await deleteCollection(name);
  };

  return {
    execute,
  };
};
