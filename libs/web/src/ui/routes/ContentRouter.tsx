import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CollectionProvider, PathProvider } from '../../common/Config';
import CollectionsRoute from './CollectionsRoute';
import PathsRoute from './PathsRoute';
import React from 'react';

const { Content } = Layout;

export const ContentRouter = () => {
  return (
    <Router basename={process.env['NX_PUBLIC_URL']}>
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <CollectionProvider>
                <CollectionsRoute />
              </CollectionProvider>
            )}
          />
          <Route
            exact
            path="/:collectionId"
            render={(props) => (
              <PathProvider>
                <PathsRoute collectionId={props.match.params.collectionId} />
              </PathProvider>
            )}
          />
        </Switch>
      </Content>
    </Router>
  );
};
