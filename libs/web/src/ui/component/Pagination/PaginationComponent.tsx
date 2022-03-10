import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';

export const PaginationComponent = <T,>({
  itemsSource,
  onChange,
  itemPerPage,
  size,
  orderBy,
}: PaginationComponentProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const offset = (currentPage - 1) * itemPerPage;

  const getItemsPerPage = (items: T[]) =>
    items.slice(offset, offset + itemPerPage);

  const sortItems = (items: T[]) => {
    return items.sort((firstItem, secondItem) => {
      const actualItem = JSON.parse(JSON.stringify(firstItem));
      const nextItem = JSON.parse(JSON.stringify(secondItem));
      return actualItem[orderBy].localeCompare(nextItem[orderBy]);
    });
  };

  useEffect(() => {
    onChange(getItemsPerPage(sortItems(itemsSource)));
    setTotalPages(itemsSource.length);
    setCurrentPage(1);
  }, [itemsSource]);

  useEffect(() => {
    onChange(getItemsPerPage(sortItems(itemsSource)));
  }, [currentPage]);

  return itemsSource.length > 0 ? (
    <Pagination
      size={size}
      defaultCurrent={1}
      defaultPageSize={itemPerPage}
      current={currentPage}
      pageSize={itemPerPage}
      total={totalPages}
      onChange={(page: number) => setCurrentPage(page)}
    />
  ) : (
    <></>
  );
};

declare type SizeType = 'default' | 'small';

interface PaginationComponentProps<T> {
  itemsSource: T[];
  onChange: (value: T[]) => void;
  itemPerPage: number;
  size: SizeType;
  orderBy: string;
}
