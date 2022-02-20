import { Collection } from "../model/Collection";

export interface GetCollectionsRepository {
  getCollections(): Promise<Collection[]>;
}
