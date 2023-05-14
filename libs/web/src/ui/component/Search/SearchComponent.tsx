import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

export const SearchComponent = <T, K extends keyof T>({
  itemsSource,
  onChange,
  placeholder,
  filterBy,
  size,
}: SearchComponentProps<T, K>) => {
  const [searchItem, setSearchItem] = useState<string>('');

  useEffect(() => {
    onChange(
      itemsSource.filter((item) => {
        return filterBy
          .map((filer) => (item[filer].toLowerCase().includes(searchItem.toLocaleLowerCase()) ? item : ''))
          .some((result) => result);
      })
    );
  }, [itemsSource, searchItem]);

  return (
    <Input
      style={{ width: '40%' }}
      placeholder={placeholder}
      size={size}
      onChange={(event) => setSearchItem(event.target.value)}
    />
  );
};

interface SearchComponentProps<T, K extends keyof T> {
  placeholder: string;
  itemsSource: Searchable<T, K>[];
  onChange: (value: T[]) => void;
  filterBy: K[];
  size: SizeType;
}

type SizeType = 'small' | 'middle' | 'large';

type Searchable<T, K extends keyof T> = {
  [Property in K]: string;
} & T;
