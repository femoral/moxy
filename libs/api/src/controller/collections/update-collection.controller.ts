import { Request, RequestHandler, Response } from 'express';
import { UpdateCollectionUseCase } from '@moxy-js/collections';
import * as collectionMapper from '../mapper/collection-dto.to.collection.mapper';
import { CollectionDto } from '../model/collection.dto';
import { validateUuid } from '../../common/validator';

export const makeUpdateCollectionController =
  ({ updateCollectionUseCase }: { updateCollectionUseCase: UpdateCollectionUseCase }): RequestHandler =>
  async (req: Request, res: Response) => {
    validateUuid(req.params['id']);
    const collectionDto: CollectionDto = { ...req.body, id: req.params['id'] };
    await updateCollectionUseCase.execute(collectionMapper.map(collectionDto));
    res.status(204).send();
  };
