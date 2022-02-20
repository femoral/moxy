import React, { useState } from "react";
import { ButtonComponent } from "../Button/ButtonComponent";
import { Drawer } from "antd";

export const DrawerComponent = ({ show, isModify }: DrawerComponentProps) => {
  const [title, setTitle] = useState("");
  const [isVisible, setIsVisibility] = useState(false);

  const showDrawer = () => {
    setIsVisibility(true);
  };

  const hideDrawer = () => {
    setIsVisibility(false);
  };

  const buttons = () => {
    if (isModify) {
      setTitle("Modify collection");
      return (
        <div>
          <ButtonComponent
            title={"Cancel"}
            onClick={hideDrawer}
            isLoading={false}
          />
          <ButtonComponent
            title={"Modify"}
            onClick={() => {}}
            isLoading={false}
          />
        </div>
      );
    }
    setTitle("New Collection");
    return (
      <div>
        <ButtonComponent
          title={"Cancel"}
          onClick={hideDrawer}
          isLoading={false}
        />
        <ButtonComponent title={"Save"} onClick={() => {}} isLoading={false} />
      </div>
    );
  };

  return (
    <Drawer
      title={title}
      visible={isVisible}
      placement={"right"}
      width={520}
      closable={true}
      footer={buttons()}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export interface DrawerComponentProps {
  show: boolean;
  isModify: boolean;
}
