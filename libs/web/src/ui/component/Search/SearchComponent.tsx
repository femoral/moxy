import React from 'react';
import { Input } from 'antd';

export const SearchComponent = () => {
  const { Search } = Input;

  return (
    <Search
      style={{ width: '50%' }}
      placeholder="Search for collection"
      enterButton="Search"
      size="middle"
      maxLength={1}
    />
  );
};
