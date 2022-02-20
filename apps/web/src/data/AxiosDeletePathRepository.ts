import { AxiosInstance } from "axios";
import { Path } from "../domain/model/Path";
import { DeletePathRepository } from "../domain/repository/DeletePathRepository";

export class AxiosDeletePathRepository implements DeletePathRepository {
  constructor(private readonly axios: AxiosInstance) {}

  async delete(path: Path): Promise<void> {
    await this.axios.delete(`/collections/${path.collection}/paths/${path.id}`);
  }
}
