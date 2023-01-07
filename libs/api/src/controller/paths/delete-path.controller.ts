import { Request, RequestHandler, Response } from 'express';
import { DeletePathUseCase } from '@moxy/collections';
import { validateUuid } from '../../common/validator';

export const makeDeletePathController =
  ({
    deletePathUseCase,
  }: {
    deletePathUseCase: DeletePathUseCase;
  }): RequestHandler =>
  async (req: Request, res: Response) => {
    validateUuid(req.params['collectionId']);
    validateUuid(req.params['id']);
    await deletePathUseCase.execute(
      req.params['collectionId'],
      req.params['id']
    );
    res.status(204).send();
  };
