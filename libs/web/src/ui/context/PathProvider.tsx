import { CollectionToCollectionViewModelMapper } from './mapper/CollectionToCollectionViewModelMapper';
import React, { createContext, useEffect, useState } from 'react';
import { GetCollectionByIdUseCase } from '../../domain/GetCollectionByIdUseCase';
import { SavePathUseCase } from '../../domain/SavePathUseCase';
import { PathViewModel } from './model/PathViewModel';
import { Form, FormInstance, message } from 'antd';
import { PathFormViewModel } from './model/PathFromViewModel';
import { PathFormViewModelToPathMapper } from './mapper/PathFormViewModelToPathMapper';
import { DeletePathUseCase } from '../../domain/DeletePathUseCase';
import { PathViewModelToPathFromViewModelMapper } from './mapper/PathViewModelToPathFromViewModelMapper';

export interface IPathContext {
  collectionId: string;
  collectionName: string;
  paths: PathViewModel[];
  setCollectionId: (collectionId: string) => void;
  isDrawerVisible: boolean;
  showDrawer: () => void;
  hideDrawer: () => void;
  savePath: (path: any) => void;
  deletePath: (path: any) => void;
  editPath: (path: any) => void;
  form?: FormInstance<PathViewModel>;
}

export interface IPathDependencies {
  collectionMapper: CollectionToCollectionViewModelMapper;
  getCollectionByIdUseCase: GetCollectionByIdUseCase;
  addPathUseCase: SavePathUseCase;
  deletePathUseCase: DeletePathUseCase;
  pathFormMapper: PathFormViewModelToPathMapper;
  pathViewModelToFormMapper: PathViewModelToPathFromViewModelMapper;
}

export const createPathProvider =
  ({
    collectionMapper,
    getCollectionByIdUseCase,
    addPathUseCase,
    deletePathUseCase,
    pathFormMapper,
    pathViewModelToFormMapper,
  }: IPathDependencies): React.FC =>
  ({ children }) => {
    const [collectionId, setCollectionId] = useState('');
    const [collectionName, setCollectionName] = useState('');
    const [paths, setPaths] = useState<PathViewModel[]>([]);
    const [isDrawerVisible, setDrawerVisibility] = useState(false);
    const [shouldRefresh, refresh] = useState<any>({});

    const [form] = Form.useForm<PathViewModel>();

    useEffect(() => {
      if (collectionId) {
        getCollectionByIdUseCase
          .execute(collectionId)
          .then((collection) => collectionMapper.map(collection))
          .then((collectionViewModel) => {
            setCollectionName(collectionViewModel.name);
            setPaths(collectionViewModel.paths);
          });
      }
    }, [collectionId, shouldRefresh]);

    const savePath = async (path: PathFormViewModel) => {
      await addPathUseCase.execute(
        pathFormMapper.map({ ...path, collection: collectionId })
      );
      hideDrawer();
      message.success('Path saved');
      refresh({});
    };

    const deletePath = async (path: PathViewModel) => {
      await deletePathUseCase.execute({ ...path });
      message.success('Path deleted');
      refresh({});
    };

    const editPath = async (path: PathViewModel) => {
      form.setFieldsValue(pathViewModelToFormMapper.map(path));
      showDrawer();
    };

    const showDrawer = () => {
      setDrawerVisibility(true);
    };

    const hideDrawer = () => {
      form.resetFields();
      setDrawerVisibility(false);
    };

    return (
      <PathContext.Provider
        value={{
          collectionId,
          paths,
          collectionName,
          isDrawerVisible,
          setCollectionId,
          savePath,
          editPath,
          deletePath,
          showDrawer,
          hideDrawer,
          form,
        }}
      >
        {children}
      </PathContext.Provider>
    );
  };

export const PathContext = createContext<IPathContext>({
  savePath: () => {},
  deletePath: () => {},
  editPath: () => {},
  hideDrawer(): void {},
  showDrawer(): void {},
  isDrawerVisible: false,
  collectionId: '',
  collectionName: '',
  paths: [],
  setCollectionId: () => {},
});
