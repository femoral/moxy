import React, { useEffect, useState } from 'react';
import { Col, Layout, Row } from 'antd';
import './App.css';
import { ContentRouter } from './ui/routes/ContentRouter';
import { AppProvider } from './common/Config';
import { SwitchComponent } from './ui/component/Switch/SwitchComponent';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import dark from './ui/styles/themes/dark';
import light from './ui/styles/themes/light';
import GlobalStyle from './ui/styles/global';
import { BrowserRouter as Router } from 'react-router-dom';
import SideMenu from './ui/container/SideMenu';

const { Header } = Layout;

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
      <Router basename={process.env['NX_PUBLIC_URL']}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout style={{ minHeight: '100vh' }}>
            <SideMenu />
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
      </Router>
    </AppProvider>
  );
}

export default App;
