import { PathDto } from '../paths';

export interface CollectionDto {
  id?: string;
  name: string;
  basePath: string;
  paths?: PathDto[];
}
