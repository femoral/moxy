import { AxiosInstance } from "axios";
import { Collection } from "../domain/model/Collection";
import { CollectionDto } from "./model/CollectionDto";
import { GetCollectionsRepository } from "../domain/repository/GetCollectionsRepository";

export class AxiosGetCollectionsRepository implements GetCollectionsRepository {
  private readonly path = "/collections";

  constructor(private readonly axios: AxiosInstance) {}

  async getCollections(): Promise<Collection[]> {
    let axiosResponse = await this.axios.get<CollectionDto[]>(this.path);
    return axiosResponse.data.map((collection) => ({ ...collection }));
  }
}
