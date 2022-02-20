import React, { useContext } from "react";
import { CollectionViewModel } from "../context/model/CollectionViewModel";
import { useHistory } from "react-router-dom";
import { Card } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  CollectionContext,
  ICollectionContext,
} from "../context/CollectionProvider";

const CollectionCard = (collection: CollectionViewModel) => {
  const { id, name, pathNumber } = collection;
  const history = useHistory();
  const {
    editCollection,
    removeCollection,
    exportCollection,
  } = useContext<ICollectionContext>(CollectionContext);

  const navigate = () => history.push(`./${id}`);
  const edit = () => editCollection(collection);
  const remove = () => removeCollection(collection);

  return (
    <Card
      title={name}
      actions={[
        <EyeOutlined key={"view"} onClick={navigate} />,
        <EditOutlined key={"view"} onClick={edit} />,
        <DownloadOutlined
          key={"export"}
          onClick={() => exportCollection(collection)}
        />,
        <DeleteOutlined key={"delete"} onClick={remove} />,
      ]}
    >
      <p>{pathNumber} paths registered</p>
    </Card>
  );
};

export default CollectionCard;
