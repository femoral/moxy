import { Request, RequestHandler, Response } from 'express';
import { CreateCollectionUseCase } from '@moxy-js/collections';
import * as collectionMapper from '../mapper/collection-dto.to.collection.mapper';
import { CollectionDto } from '../model/collection.dto';

export const makeAddCollectionController =
  ({
    createCollectionUseCase,
  }: {
    createCollectionUseCase: CreateCollectionUseCase;
  }): RequestHandler =>
  async (req: Request, res: Response) => {
    const collectionDto: CollectionDto = req.body;
    const collection = await createCollectionUseCase.execute(
      collectionMapper.map(collectionDto)
    );
    res.status(201).send({ id: collection.id });
  };
