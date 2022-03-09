import React from 'react';
import { Input } from 'antd';

export const SearchComponent = () => {
  const onChange = (collectionName: string) => {
    console.log(collectionName);
  };

  return (
    <Input
      style={{ width: '40%' }}
      placeholder="Search for collection"
      size="middle"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
