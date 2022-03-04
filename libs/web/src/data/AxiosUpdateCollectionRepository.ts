import { Collection } from '../domain/model/Collection';
import { UpdateCollectionRepository } from '../domain/repository/UpdateCollectionRepository';
import { AxiosInstance } from 'axios';

export class AxiosUpdateCollectionRepository
  implements UpdateCollectionRepository
{
  private readonly path = '/collections';

  constructor(private readonly axios: AxiosInstance) {}

  async update(collection: Collection): Promise<Collection> {
    await this.axios.put<void>(`${this.path}/${collection.id}`, collection);
    return {
      id: collection.id,
      basePath: collection.basePath,
      name: collection.name,
      paths: collection.paths,
    };
  }
}
