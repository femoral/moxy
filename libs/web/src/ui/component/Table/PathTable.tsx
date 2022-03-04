import React, { useContext } from 'react';
import { PathViewModel } from '../../context/model/PathViewModel';
import { Button, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IPathContext, PathContext } from '../../context/PathProvider';

export const PathTables = ({ paths }: PathTableProps) => {
  const { deletePath, editPath } = useContext<IPathContext>(PathContext);

  const columns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Path', dataIndex: 'path', key: 'path' },
    { title: 'Method', dataIndex: 'method', key: 'method' },
    {
      title: 'Action',
      key: 'action',
      render: (record: PathViewModel) => (
        <div>
          <Button onClick={() => editPath(record)}>
            <EditOutlined />
          </Button>
          <Button>
            <DeleteOutlined onClick={() => deletePath(record)} />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Table
          dataSource={paths}
          columns={columns}
          rowKey={(path: PathViewModel) => path.id || ''}
        />
      </DndProvider>
    </div>
  );
};

export interface PathTableProps {
  paths: PathViewModel[];
  showDrawer: () => void;
}
