import path from "path";
import rimraf from "rimraf";
import { promisify } from "util";
import { DeleteCollection } from "../repository/collection.repository";

const makeJsonDeleteCollectionRepository = ({
  collectionsBasePath,
}: {
  collectionsBasePath: string;
}): DeleteCollection => async (name: string): Promise<void> => {
  await promisify(rimraf)(path.join(collectionsBasePath, name));
};
export {makeJsonDeleteCollectionRepository};
