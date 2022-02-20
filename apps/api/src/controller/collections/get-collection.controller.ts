import {Request, RequestHandler, Response} from "express";
import * as collectionMapper from "../mapper/collection-dto.to.collection.mapper";
import {validateUuid} from "../../common/validator";
import {GetCollectionUseCase} from "@moxy/collections";

export const makeGetCollectionController = ({
  getCollectionUseCase,
}: {
  getCollectionUseCase: GetCollectionUseCase;
}): RequestHandler => async (req: Request, res: Response) => {
  const collectionId = req.params["id"];
  validateUuid(collectionId);
  res.send(
    collectionMapper.reverseMap(
      await getCollectionUseCase.execute(collectionId)
    )
  );
};
