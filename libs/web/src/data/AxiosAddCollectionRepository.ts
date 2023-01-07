import { AxiosInstance } from 'axios';
import { Collection } from '../domain/model/Collection';
import { AddCollectionRepository } from '../domain/repository/AddCollectionsRepository';

export class AxiosAddCollectionRepository implements AddCollectionRepository {
  private readonly path = '/collections';

  constructor(private readonly axios: AxiosInstance) {}

  async addCollection(collection: Collection): Promise<Collection> {
    let axiosResponse = await this.axios.post<string>(this.path, collection);
    return {
      id: axiosResponse.data,
      basePath: collection.basePath,
      name: collection.name,
      paths: [],
    };
  }
}
