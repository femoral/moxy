import { Button, Drawer, PageHeader } from "antd";
import React, { useContext, useEffect } from "react";
import PathEditor from "../container/PathEditor";
import { useHistory } from "react-router-dom";
import { PathTables } from "../component/Table/PathTable";
import { IPathContext, PathContext } from "../context/PathProvider";

const PathsRoute = ({ collectionId }: PathsRouteProps) => {
  const {
    collectionName,
    setCollectionId,
    paths,
    showDrawer,
    hideDrawer,
    isDrawerVisible,
    form,
  } = useContext<IPathContext>(PathContext);
  const history = useHistory();

  useEffect(() => {
    setCollectionId(collectionId);
  }, [setCollectionId, collectionId]);

  return (
    <>
      <PageHeader
        className={"content-header"}
        onBack={() => history.goBack()}
        title={"Paths"}
        subTitle={collectionName}
        extra={[
          <Button type="primary" onClick={showDrawer} key={"add-button"}>
            Add Path
          </Button>,
        ]}
      />
      <PathTables paths={paths} showDrawer={showDrawer} />
      <Drawer
        title="New Path"
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
            <Button onClick={form?.submit} type="primary">
              Save
            </Button>
          </div>
        }
      >
        <PathEditor />
      </Drawer>
    </>
  );
};

export interface PathsRouteProps {
  collectionId: string;
}

export default PathsRoute;
