import React, { useEffect, useState } from 'react';
import { Col, Layout, Menu, Row, Typography } from 'antd';
import './App.css';
import { FolderOutlined } from '@ant-design/icons';
import { ContentRouter } from './ui/routes/ContentRouter';
import { AppProvider } from './common/Config';
import { SwitchComponent } from './ui/component/Switch/SwitchComponent';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import dark from './ui/styles/themes/dark';
import light from './ui/styles/themes/light';
import GlobalStyle from './ui/styles/global';

const { Sider, Header } = Layout;

function App() {
  const [theme, setTheme] = useState<DefaultTheme>(localStorage.getItem('theme') === 'dark' ? dark : light);

  const changeTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme.title);
  }, [theme]);

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout style={{ minHeight: '100vh' }}>
          <Sider trigger={null}>
            <div className="logo">
              <Typography.Title style={{ color: '#fff' }}>moxy</Typography.Title>
            </div>
            <Menu theme={'dark'} mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<FolderOutlined />}>
                Collections
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Row>
                <Col offset={22} span={2}>
                  <SwitchComponent checkedValue={theme.title !== 'light'} onChange={changeTheme} />
                </Col>
              </Row>
            </Header>
            <ContentRouter />
          </Layout>
        </Layout>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
