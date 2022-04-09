import { useHistory } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { FolderOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';

const { Sider } = Layout;

const SideMenu = () => {
  const history = useHistory();

  return (
    <Sider theme="dark" trigger={null}>
      <div className="logo">
        <Typography.Title style={{ color: '#fff' }}>moxy</Typography.Title>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<FolderOutlined />} onClick={() => history.push(`/`)}>
          Collections
        </Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined />} onClick={() => history.push(`/events`)}>
          Traffic
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
