import { Request, RequestHandler, Response } from 'express';
import * as collectionMapper from '../mapper/collection-dto.to.collection.mapper';
import { GetCollectionsUseCase } from '@moxy/collections';

export const makeGetCollectionsController =
  ({
    getCollectionsUseCase,
  }: {
    getCollectionsUseCase: GetCollectionsUseCase;
  }): RequestHandler =>
  async (req: Request, res: Response) => {
    res.send(
      (await getCollectionsUseCase.execute()).map((collection) =>
        collectionMapper.reverseMap(collection)
      )
    );
  };
