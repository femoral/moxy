import React, { createContext, useEffect, useState } from 'react';
import { CollectionViewModel } from './model/CollectionViewModel';
import { GetCollectionsUseCase } from '../../domain/GetCollectionsUseCase';
import { CollectionToCollectionViewModelMapper } from './mapper/CollectionToCollectionViewModelMapper';
import { SaveCollectionUseCase } from '../../domain/SaveCollectionUseCase';
import { message } from 'antd';
import { DeleteCollectionUseCase } from '../../domain/DeleteCollectionUseCase';
import { GetCollectionByIdUseCase } from '../../domain/GetCollectionByIdUseCase';

export interface ICollectionContext {
  collections: CollectionViewModel[];
  selectedCollection?: CollectionViewModel;
  getCollections: () => void;
  isDrawerVisible: boolean;
  showDrawer: () => void;
  hideDrawer: () => void;
  saveCollection: (collection: any) => void;
  editCollection: (collection: any) => void;
  removeCollection: (collection: any) => void;
  exportCollection: (collection: any) => void;
  importCollection: (collection: any) => void;
}

export const createCollectionProvider = ({
  getCollectionsUseCase,
  saveCollectionUseCase,
  deleteCollectionUseCase,
  getCollectionByIdUseCase,
  collectionMapper,
}: ICollectionDependencies): React.FC => {
  return ({ children }) => {
    const [collections, setCollections] = useState<CollectionViewModel[]>([]);
    const [isDrawerVisible, setDrawerVisibility] = useState(false);
    const [shouldRefresh, refresh] = useState<any>({});
    const [selectedCollection, setSelectedCollection] = useState<
      CollectionViewModel | undefined
    >(undefined);

    useEffect(() => {
      getCollectionsUseCase
        .execute()
        .then((collections) => collectionMapper.mapArray(collections))
        .then(setCollections);
    }, [shouldRefresh]);

    const getCollections = async () => {
      setCollections(
        collectionMapper.mapArray(await getCollectionsUseCase.execute())
      );
    };

    const saveCollection = async (collection: any) => {
      await saveCollectionUseCase.execute(collection);
      hideDrawer();
      message.success('Collection saved');
      refresh({});
    };

    const importCollection = async (collection: any) => {
      await saveCollectionUseCase.execute({ ...collection, id: undefined });
      message.success('Collection imported');
      refresh({});
    };

    const editCollection = async (collection: CollectionViewModel) => {
      showDrawer();
      setSelectedCollection(collection);
    };

    const removeCollection = async (collection: any) => {
      await deleteCollectionUseCase.execute(collection);
      message.info('Collection deleted');
      refresh({});
    };

    const showDrawer = () => {
      setDrawerVisibility(true);
    };

    const hideDrawer = () => {
      setDrawerVisibility(false);
      setSelectedCollection(undefined);
    };

    const exportCollection = async (collection: CollectionViewModel) => {
      const collectionToBeExported = await getCollectionByIdUseCase.execute(
        collection.id!
      );
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(collectionToBeExported));
      const anchorElement = document.createElement('a');
      anchorElement.setAttribute('href', dataStr);
      anchorElement.setAttribute('download', collection.name + '.json');
      anchorElement.click();
      anchorElement.remove();
    };

    return (
      <CollectionContext.Provider
        value={{
          collections,
          getCollections,
          showDrawer,
          hideDrawer,
          isDrawerVisible,
          saveCollection,
          editCollection,
          removeCollection,
          selectedCollection,
          exportCollection,
          importCollection,
        }}
      >
        {children}
      </CollectionContext.Provider>
    );
  };
};

interface ICollectionDependencies {
  getCollectionsUseCase: GetCollectionsUseCase;
  getCollectionByIdUseCase: GetCollectionByIdUseCase;
  saveCollectionUseCase: SaveCollectionUseCase;
  deleteCollectionUseCase: DeleteCollectionUseCase;
  collectionMapper: CollectionToCollectionViewModelMapper;
}

export const CollectionContext = createContext<ICollectionContext>({
  collections: [],
  getCollections: () => {},
  hideDrawer(): void {},
  showDrawer(): void {},
  isDrawerVisible: false,
  saveCollection: () => {},
  editCollection: () => {},
  removeCollection: () => {},
  exportCollection: () => {},
  importCollection: () => {},
});
