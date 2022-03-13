import React, { ReactNode, useState } from 'react';
import { Switch } from 'antd';

export const SwitchComponent = ({ onChange, checkedChildren, unCheckedChildren, isDisable }: SwitchComponentProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    onChange();
  };

  return (
    <Switch
      defaultChecked={false}
      checked={isChecked}
      onChange={handleOnChange}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
      disabled={isDisable}
    />
  );
};

interface SwitchComponentProps {
  onChange: () => void;
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
  size?: SizeType;
  isDisable?: boolean;
}

type SizeType = 'default' | 'small';
