import React, { useContext } from 'react';
import { PathViewModel } from '../../context/model/PathViewModel';
import { Button, Table, Typography } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IPathContext, PathContext } from '../../context/PathProvider';

const { Text } = Typography;

export const PathTables = ({ paths }: PathTableProps) => {
  const { deletePath, editPath, copyPath, parentCollection } = useContext<IPathContext>(PathContext);

  const columns = [
    {
      title: 'Type',
      key: 'type',
      width: '32px',
      render: (record: PathViewModel) => (
        <div>
          <Text strong>{record.type.toUpperCase()}</Text>
        </div>
      ),
    },
    {
      title: 'Method',
      key: 'method',
      render: (record: PathViewModel) => (
        <div>
          <Text strong>{record.method.toUpperCase()}</Text>
        </div>
      ),
      width: '32px',
    },
    {
      title: 'Path',
      key: 'path',
      render: (record: PathViewModel) => (
        <div>
          <Text type={'secondary'}>/{parentCollection?.basePath}</Text>
          <Text>{record.path}</Text>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: PathViewModel) => (
        <div>
          <Button onClick={() => copyPath(record)}>
            <CopyOutlined />
          </Button>
          <Button onClick={() => editPath(record)}>
            <EditOutlined />
          </Button>
          <Button>
            <DeleteOutlined onClick={() => deletePath(record)} />
          </Button>
        </div>
      ),
      width: '180px',
    },
  ];
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Table dataSource={paths} columns={columns} rowKey={(path: PathViewModel) => path.id || ''} />
      </DndProvider>
    </div>
  );
};

export interface PathTableProps {
  paths: PathViewModel[];
  showDrawer: () => void;
}
