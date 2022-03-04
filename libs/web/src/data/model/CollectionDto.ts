import { PathDto } from './PathDto';

export interface CollectionDto {
  id?: string;
  name: string;
  basePath: string;
  paths: PathDto[];
}
