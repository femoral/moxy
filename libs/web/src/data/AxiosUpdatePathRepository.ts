import { AxiosInstance } from 'axios';
import { Path } from '../domain/model/Path';
import { UpdatePathRepository } from '../domain/repository/UpdatePathRepository';

export class AxiosUpdatePathRepository implements UpdatePathRepository {
  constructor(private readonly axios: AxiosInstance) {}

  async update(path: Path): Promise<void> {
    await this.axios.put(
      `/collections/${path.collection}/paths/${path.id}`,
      path
    );
  }
}
