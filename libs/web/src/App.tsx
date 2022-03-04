import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import './App.css';
import { FolderOutlined } from '@ant-design/icons';
import { ContentRouter } from './ui/routes/ContentRouter';
import { AppProvider } from './common/Config';

const { Sider, Header } = Layout;

function App() {
  return (
    <AppProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="dark" trigger={null}>
          <div className="logo">
            <Typography.Title style={{ color: '#fff' }}>moxy</Typography.Title>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<FolderOutlined />}>
              Collections
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            &nbsp;
          </Header>
          <ContentRouter />
        </Layout>
      </Layout>
    </AppProvider>
  );
}

export default App;
