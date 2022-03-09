import { Collection } from "../collection";
import path from "path";
import { CollectionModel, PathMap } from "./model/collection.model";
import { Path } from "@moxy-js/paths";
import { pathMapper } from "@moxy-js/paths";
import { existsSync } from "graceful-fs";
import { promises as fs } from "fs";
import { CreateCollection } from "../repository/collection.repository";

const makeJsonCreateCollectionRepository = ({
  collectionsBasePath,
}: {
  collectionsBasePath: string;
}): CreateCollection => async (collection: Collection): Promise<void> => {
  const collectionFolder = path.join(collectionsBasePath, collection.id);
  const collectionModel: CollectionModel = {
    id: collection.id,
    name: collection.name,
    basePath: collection.basePath,
    paths: collection.paths.reduce((paths: PathMap, path: Path) => {
      paths[path.id] = pathMapper.map(path);
      return paths;
    }, {}),
  };

  if (existsSync(collectionFolder)) {
    throw new Error("collection already exists");
  } else {
    await fs.mkdir(collectionFolder);
    await fs.writeFile(
      path.join(collectionFolder, "collection.json"),
      JSON.stringify(collectionModel, undefined, 4)
    );
  }
};
export { makeJsonCreateCollectionRepository };
