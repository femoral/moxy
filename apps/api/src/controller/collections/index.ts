import { RequestHandler, Router } from "express";
import { catchErrors } from "../middleware/error.middleware";
import { addCollectionValidator } from "./schema/add-collection.schema";
import { schemaMiddleware } from "../middleware/schema.middleware";
import { updateCollectionValidator } from "./schema/update-collection.schema";

const collectionsRouter = ({
  getCollections,
  addCollection,
  getCollection,
  deleteCollection,
  updateCollection,
  restartMiddleware,
}: {
  getCollections: RequestHandler;
  addCollection: RequestHandler;
  getCollection: RequestHandler;
  deleteCollection: RequestHandler;
  updateCollection: RequestHandler;
  restartMiddleware: RequestHandler;
}) => {
  const router = Router();

  router.get("/", catchErrors(getCollections));
  router.get("/:id", catchErrors(getCollection));
  router.post(
    "/",
    schemaMiddleware(addCollectionValidator),
    restartMiddleware,
    catchErrors(addCollection)
  );
  router.put(
    "/:id",
    schemaMiddleware(updateCollectionValidator),
    restartMiddleware,
    catchErrors(updateCollection)
  );
  router.delete("/:id", restartMiddleware, catchErrors(deleteCollection));

  return router;
};

export default collectionsRouter;
