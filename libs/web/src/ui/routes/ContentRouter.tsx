import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { CollectionProvider, PathProvider } from '../../common/Config';
import CollectionsRoute from './CollectionsRoute';
import PathsRoute from './PathsRoute';
import React from 'react';
import EventRoute from './EventRoute';

const { Content } = Layout;

export const ContentRouter = () => {
  return (
    <Content
        className="site-layout-background"
        style={{
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
          /><Route exact path="/events" render={(props) => <EventRoute />} />
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
  );
};
