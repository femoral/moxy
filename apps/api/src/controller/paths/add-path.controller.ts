import {Request, RequestHandler, Response} from "express";
import {AddPathUseCase} from "@moxy/collections";
import * as pathDtoToPathMapper from "../mapper/path-dto.to.path.mapper";

export const makeAddPathController = ({
  addPathUseCase,
}: {
  addPathUseCase: AddPathUseCase;
}): RequestHandler => async (req: Request, res: Response) => {
  res.status(201).send({
    id: await addPathUseCase.execute(
      pathDtoToPathMapper.map({
        collection: req.params["collectionId"],
        ...req.body,
      })
    ),
  });
};
