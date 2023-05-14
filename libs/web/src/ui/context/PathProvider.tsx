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
import { CollectionViewModel } from './model/CollectionViewModel';

export interface IPathContext {
  collectionId: string;
  setCollectionId: (collectionId: string) => void;
  isDrawerVisible: boolean;
  showDrawer: () => void;
  hideDrawer: () => void;
  savePath: (path: any) => void;
  deletePath: (path: any) => void;
  editPath: (path: any) => void;
  copyPath: (path: any) => void;
  parentCollection?: CollectionViewModel;
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
    const [parentCollection, setParentCollection] = useState<CollectionViewModel>();
    const [collectionId, setCollectionId] = useState('');
    const [isDrawerVisible, setDrawerVisibility] = useState(false);
    const [shouldRefresh, refresh] = useState<any>({});

    const [form] = Form.useForm<PathViewModel>();

    useEffect(() => {
      if (collectionId) {
        getCollectionByIdUseCase
          .execute(collectionId)
          .then((collection) => collectionMapper.map(collection))
          .then((collectionViewModel) => {
            setParentCollection(collectionViewModel);
          });
      }
    }, [collectionId, shouldRefresh]);

    const savePath = async (path: PathFormViewModel) => {
      await addPathUseCase.execute(pathFormMapper.map({ ...path, collection: collectionId }));
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

    const copyPath = async (path: PathViewModel) => {
      await navigator.clipboard.writeText(`${window.location.origin}/${parentCollection?.basePath}${path.path}`);
      message.info('Path copied to the clipboard');
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
          parentCollection,
          isDrawerVisible,
          setCollectionId,
          savePath,
          editPath,
          copyPath,
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
  copyPath: () => {},
  hideDrawer(): void {},
  showDrawer(): void {},
  isDrawerVisible: false,
  collectionId: '',
  setCollectionId: () => {},
});
