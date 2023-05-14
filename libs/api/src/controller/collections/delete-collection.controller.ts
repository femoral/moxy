import { Request, RequestHandler, Response } from 'express';
import { DeleteCollectionUseCase } from '@moxy-js/collections';
import { validateUuid } from '../../common/validator';

export const makeDeleteCollectionController =
  ({ deleteCollectionUseCase }: { deleteCollectionUseCase: DeleteCollectionUseCase }): RequestHandler =>
  async (req: Request, res: Response) => {
    const collectionId = req.params['id'];
    validateUuid(collectionId);
    res.status(204).send(await deleteCollectionUseCase.execute(collectionId));
  };
