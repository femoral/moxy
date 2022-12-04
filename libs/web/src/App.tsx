import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography, ConfigProvider, Col, Row } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { ContentRouter } from './ui/routes/ContentRouter';
import { AppProvider } from './common/Config';
import { darkTheme } from './ui/themes/dark';
import { lightTheme } from './ui/themes/light';
import { SwitchComponent } from './ui/component/Switch/SwitchComponent';
import './App.css';

const { Sider, Header } = Layout;

function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

  const changeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <AppProvider>
      <ConfigProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider trigger={null}>
            <div className="logo">
              <Typography.Title>moxy</Typography.Title>
            </div>
            <Menu mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item className="test" key="1" icon={<FolderOutlined />}>
                Collections
              </Menu.Item>
              <Menu.Item key="2" icon={<FolderOutlined />}>
                MOCK
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout className="site-layout">
            <ContentRouter />
          </Layout>
        </Layout>
      </ConfigProvider>
    </AppProvider>
  );
}

export default App;
