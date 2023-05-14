import React from 'react';
import { Button } from 'antd';

export const ButtonComponent = ({
  title,
  onClick,
  isLoading,
}: ConfirmProps) => {
  return (
    <Button onClick={onClick} loading={isLoading}>
      {title}
    </Button>
  );
};

export interface ConfirmProps {
  title: string;
  onClick: () => void;
  isLoading: boolean;
}
