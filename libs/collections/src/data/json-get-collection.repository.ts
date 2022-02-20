import { GetCollection } from "../repository/collection.repository";
import { Collection } from "../collection";
import path from "path";
import { CollectionModel } from "./model/collection.model";
import { promises as fs } from "fs";
import { MockModel, ProxyModel } from "@moxy/paths";
import { ProxyPath } from "@moxy/paths";
import { MockPath } from "@moxy/paths";

const makeJsonGetCollectionRepository = ({
  collectionsBasePath,
}: {
  collectionsBasePath: string;
}): GetCollection => async (id: string): Promise<Collection> => {
  const collectionFilePath = path.join(
    collectionsBasePath,
    id,
    "collection.json"
  );
  const collection: CollectionModel = JSON.parse(
    await fs.readFile(collectionFilePath, "utf-8")
  );

  return new Collection(
    collection.id,
    collection.name,
    collection.basePath,
    Object.keys(collection.paths).map(map)
  );

  function map(id: string) {
    const path = collection.paths[id];
    switch (path.type) {
      case "mock":
        return mapMock(id, collection.id, path as MockModel);
      case "proxy":
        return mapProxy(id, collection.id, path as ProxyModel);
    }
  }

  function mapProxy(id: string, collectionId: string, path: ProxyModel) {
    return new ProxyPath(id, collectionId, path.path, path.method, path.target);
  }

  function mapMock(id: string, collectionId: string, path: MockModel) {
    return new MockPath(
      id,
      collectionId,
      path.path,
      path.method,
      path.responseBody,
      path.contentType,
      path.encoded
    );
  }
};
export {makeJsonGetCollectionRepository};
