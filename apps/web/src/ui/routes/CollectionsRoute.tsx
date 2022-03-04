import { Button, Drawer, Form, List, PageHeader, Upload } from "antd";
import CollectionCard from "../component/CollectionCard";
import React, { useContext } from "react";
import {
  CollectionContext,
  ICollectionContext,
} from "../context/CollectionProvider";
import CollectionEditor from "../container/CollectionEditor";
import { FolderAddOutlined, UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

const CollectionsRoute = () => {
  const {
    collections,
    isDrawerVisible,
    hideDrawer,
    showDrawer,
    importCollection,
    selectedCollection,
  } = useContext<ICollectionContext>(CollectionContext);
  const [collectionEditorForm] = Form.useForm();

  const beforeUpload = (file: RcFile) => {
    file.text().then(JSON.parse).then(importCollection);
    return false;
  };

  return (
    <>
      <PageHeader
        className={"content-header"}
        title={"Collections"}
        extra={[
          <Upload
            beforeUpload={beforeUpload}
            showUploadList={false}
            key={"import-button"}
          >
            <Button icon={<UploadOutlined />}>Import Collection</Button>
          </Upload>,
          <Button
            icon={<FolderAddOutlined />}
            type="primary"
            onClick={showDrawer}
            key={"add-button"}
          >
            Add Collection
          </Button>,
        ]}
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={collections}
        renderItem={(item) => (
          <List.Item>
            <CollectionCard {...item} />
          </List.Item>
        )}
      />
      <Drawer
        title={selectedCollection?.name || "New Collection"}
        placement="right"
        width={520}
        closable={true}
        onClose={hideDrawer}
        visible={isDrawerVisible}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={hideDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={collectionEditorForm.submit} type="primary">
              Save
            </Button>
          </div>
        }
      >
        <CollectionEditor pathEditorForm={collectionEditorForm} />
      </Drawer>
    </>
  );
};

export default CollectionsRoute;
