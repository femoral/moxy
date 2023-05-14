import { AxiosInstance } from 'axios';
import { AddPathRepository } from '../domain/repository/AddPathRepository';
import { Path } from '../domain/model/Path';

export class AxiosAddPathRepository implements AddPathRepository {
  constructor(private readonly axios: AxiosInstance) {}

  async add(path: Path): Promise<void> {
    await this.axios.post('/collections/' + path.collection + '/paths', path);
  }
}
