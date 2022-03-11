import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

export const SearchComponent = <T,>({
  itemsSource,
  onChange,
  placeholder,
  filterBy,
  size,
}: SearchComponentProps<T>) => {
  const [searchItem, setSearchItem] = useState<string>('');

  useEffect(() => {
    onChange(
      itemsSource.filter((item: T) => {
        const itemParsed = JSON.parse(JSON.stringify(item));
        return itemParsed[filterBy].includes(searchItem) ? item : '';
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

declare type SizeType = 'small' | 'middle' | 'large';

interface SearchComponentProps<T> {
  placeholder: string;
  itemsSource: T[];
  onChange: (value: T[]) => void;
  filterBy: string;
  size: SizeType;
}
