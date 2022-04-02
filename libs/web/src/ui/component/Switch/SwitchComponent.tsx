import React, { ReactNode, useState } from 'react';
import { Switch } from 'antd';

export const SwitchComponent = ({
  onChange,
  checkedValue,
  checkedChildren,
  unCheckedChildren,
  isDisable,
}: SwitchComponentProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(!!checkedValue);

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
  checkedValue?: boolean;
}

type SizeType = 'default' | 'small';
