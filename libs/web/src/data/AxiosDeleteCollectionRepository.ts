import { AxiosInstance } from 'axios';
import { Collection } from '../domain/model/Collection';
import { DeleteCollectionRepository } from '../domain/repository/DeleteCollectionRepository';

export class AxiosDeleteCollectionRepository implements DeleteCollectionRepository {
  private readonly path = '/collections/';

  constructor(private readonly axios: AxiosInstance) {}

  async delete(collection: Collection): Promise<void> {
    await this.axios.delete<string>(this.path + collection.id);
  }
}
