import {Request, RequestHandler, Response} from "express";
import {UpdatePathUseCase} from "@moxy/collections";
import * as pathDtoToPathMapper from "../mapper/path-dto.to.path.mapper";
import {validateUuid} from "../../common/validator";

export const makeUpdatePathController = ({
  updatePathUseCase,
}: {
  updatePathUseCase: UpdatePathUseCase;
}): RequestHandler => async (req: Request, res: Response) => {
  validateUuid(req.params["collectionId"]);
  validateUuid(req.params["id"]);
  await updatePathUseCase.execute(
    pathDtoToPathMapper.map({
      id: req.params["id"],
      collection: req.params["collectionId"],
      ...req.body,
    })
  );
  res.status(204).send();
};
