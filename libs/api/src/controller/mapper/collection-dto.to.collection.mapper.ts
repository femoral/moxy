import { Collection } from '@moxy-js/collections';
import * as pathMapper from './path-dto.to.path.mapper';
import { CollectionDto } from '@moxy-js/dto';

export function map(collectionDto: CollectionDto): Collection {
  return new Collection(
    collectionDto.id,
    collectionDto.name,
    collectionDto.basePath,
    collectionDto.paths?.map(pathMapper.map),
    collectionDto.fallbackProxy && pathMapper.map(collectionDto.fallbackProxy)
  );
}

export function reverseMap(collection: Collection): CollectionDto {
  return {
    id: collection.id,
    name: collection.name,
    basePath: collection.basePath,
    paths: collection.paths.map((path) => pathMapper.reverseMap(path)),
    fallbackProxy: collection.fallbackProxy && pathMapper.reverseMap(collection.fallbackProxy),
  };
}
