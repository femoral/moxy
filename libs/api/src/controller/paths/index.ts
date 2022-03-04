import { RequestHandler, Router } from 'express';
import { catchErrors } from '../middleware/error.middleware';
import { addPathValidator } from './schema/add-path.schema';
import { schemaMiddleware } from '../middleware/schema.middleware';
import { updatePathValidator } from './schema/update-path.schema';

const pathsRouter = ({
  addPath,
  updatePath,
  deletePath,
}: {
  addPath: RequestHandler;
  updatePath: RequestHandler;
  deletePath: RequestHandler;
}) => {
  const router = Router();
  router.post(
    '/:collectionId/paths',
    schemaMiddleware(addPathValidator),
    catchErrors(addPath)
  );
  router.put(
    '/:collectionId/paths/:id',
    schemaMiddleware(updatePathValidator),
    catchErrors(updatePath)
  );
  router.delete('/:collectionId/paths/:id', catchErrors(deletePath));

  return router;
};
export default pathsRouter;
