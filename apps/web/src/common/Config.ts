import { GetCollectionsUseCase } from "../domain/GetCollectionsUseCase";
import axios, { AxiosInstance } from "axios";
import { CollectionToCollectionViewModelMapper } from "../ui/context/mapper/CollectionToCollectionViewModelMapper";
import { AxiosAddPathRepository } from "../data/AxiosAddPathRepository";
import { SavePathUseCase } from "../domain/SavePathUseCase";
import { GetCollectionByIdUseCase } from "../domain/GetCollectionByIdUseCase";
import { AxiosGetCollectionByNameRepository } from "../data/AxiosGetCollectionByNameRepository";
import { createCollectionProvider, createPathProvider } from "../ui/context";
import { AxiosGetCollectionsRepository } from "../data/AxiosGetCollectionsRepository";
import { SaveCollectionUseCase } from "../domain/SaveCollectionUseCase";
import { AxiosAddCollectionRepository } from "../data/AxiosAddCollectionRepository";
import { AxiosDeleteCollectionRepository } from "../data/AxiosDeleteCollectionRepository";
import { DeleteCollectionUseCase } from "../domain/DeleteCollectionUseCase";
import { createAppProvider } from "../ui/context/AppProvider";
import { AxiosErrorInterceptor } from "./AxiosErrorInterceptor";
import { PathFormViewModelToPathMapper } from "../ui/context/mapper/PathFormViewModelToPathMapper";
import { AxiosUpdateCollectionRepository } from "../data/AxiosUpdateCollectionRepository";
import { DeletePathUseCase } from "../domain/DeletePathUseCase";
import { AxiosDeletePathRepository } from "../data/AxiosDeletePathRepository";
import { PathViewModelToPathFromViewModelMapper } from "../ui/context/mapper/PathViewModelToPathFromViewModelMapper";
import { AxiosUpdatePathRepository } from "../data/AxiosUpdatePathRepository";

const axiosInstance: AxiosInstance = axios.create({ baseURL: "/api" });

const getCollectionByIdUseCase = new GetCollectionByIdUseCase(
  new AxiosGetCollectionByNameRepository(axiosInstance)
);

const getCollectionsUseCase = new GetCollectionsUseCase(
  new AxiosGetCollectionsRepository(axiosInstance)
);

const saveCollectionUseCase = new SaveCollectionUseCase(
  new AxiosAddCollectionRepository(axiosInstance),
  new AxiosUpdateCollectionRepository(axiosInstance)
);

const deleteCollectionUseCase = new DeleteCollectionUseCase(
  new AxiosDeleteCollectionRepository(axiosInstance)
);

const collectionMapper = new CollectionToCollectionViewModelMapper();

const addPathUseCase = new SavePathUseCase(
  new AxiosAddPathRepository(axiosInstance),
  new AxiosUpdatePathRepository(axiosInstance)
);

const deletePathUseCase = new DeletePathUseCase(
  new AxiosDeletePathRepository(axiosInstance)
);

const pathFormMapper = new PathFormViewModelToPathMapper();

const pathViewModelToFormMapper = new PathViewModelToPathFromViewModelMapper();

export const CollectionProvider = createCollectionProvider({
  getCollectionsUseCase,
  saveCollectionUseCase,
  deleteCollectionUseCase,
  collectionMapper,
  getCollectionByIdUseCase,
});

export const PathProvider = createPathProvider({
  addPathUseCase,
  deletePathUseCase,
  getCollectionByIdUseCase,
  collectionMapper,
  pathFormMapper,
  pathViewModelToFormMapper,
});

export const AppProvider = createAppProvider({
  errorInterceptor: new AxiosErrorInterceptor(axiosInstance),
});
