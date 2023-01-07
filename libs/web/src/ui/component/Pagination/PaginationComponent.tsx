import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';

export const PaginationComponent = <T, K extends keyof T>({
  itemsSource,
  onChange,
  itemPerPage,
  size,
  orderBy,
}: PaginationComponentProps<T, K>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const offset = (currentPage - 1) * itemPerPage;

  const getItemsPerPage = (items: T[]) => items.slice(offset, offset + itemPerPage);

  const sortItems = (items: Sortable<T, K>[]) => {
    return items.sort((actualItem, nextItem) => actualItem[orderBy].localeCompare(nextItem[orderBy]));
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
      style={{ textAlign: 'center', marginTop: '1rem' }}
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

interface PaginationComponentProps<T, K extends keyof T> {
  itemsSource: Sortable<T, K>[];
  onChange: (value: T[]) => void;
  itemPerPage: number;
  size: SizeType;
  orderBy: K;
}

type Sortable<T, K extends keyof T> = {
  [Property in K]: string;
} & T;
