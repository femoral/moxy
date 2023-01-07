import { AxiosInstance } from 'axios';
import { Collection } from '../domain/model/Collection';
import { GetCollectionByNameRepository } from '../domain/repository/GetCollectionByNameRepository';
import { CollectionDto } from '@moxy-js/dto';

export class AxiosGetCollectionByNameRepository implements GetCollectionByNameRepository {
  private readonly path = '/collections';

  constructor(private readonly axios: AxiosInstance) {}

  async getCollectionById(id: string): Promise<Collection> {
    const { data } = await this.axios.get<CollectionDto>(`${this.path}/${id}`);
    return data;
  }
}
