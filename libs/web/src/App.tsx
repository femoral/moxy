import React from 'react';
import { Layout } from 'antd';
import './App.css';
import { ContentRouter } from './ui/routes/ContentRouter';
import { AppProvider } from './common/Config';
import { BrowserRouter as Router } from 'react-router-dom';
import SideMenu from './ui/container/SideMenu';

const { Header } = Layout;

function App() {
  return (
    <AppProvider>
      <Router basename={process.env['NX_PUBLIC_URL']}>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu />
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              &nbsp;
            </Header>
            <ContentRouter />
          </Layout>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
