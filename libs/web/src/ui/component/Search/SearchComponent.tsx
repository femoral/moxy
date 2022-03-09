import React from 'react';
import { Input } from 'antd';

export const SearchComponent = ({
  onChange,
  placeholder,
}: SearchComponentProps) => {
  const search = (name: string) => {
    onChange(name);
  };

  return (
    <Input
      style={{ width: '40%' }}
      placeholder={placeholder}
      size="middle"
      onChange={(event) => search(event.target.value)}
    />
  );
};

interface SearchComponentProps {
  placeholder: string;
  onChange: (name: string) => void;
}
