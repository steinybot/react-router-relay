import * as React from 'react';
import {type EntryPointRouteObject, preparePreloadableRoutes} from '@loop-payments/react-router-relay';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import TodoAppEntryPoint from './entrypoints/TodoApp.entrypoint';
import {useRelayEnvironment} from 'react-relay';
import {getId} from './ObjectId';

const MY_ROUTES: EntryPointRouteObject[] = [
  {
    path: '/',
    entryPoint: TodoAppEntryPoint,
  }, {
    path: '/:status',
    entryPoint: TodoAppEntryPoint,
  },
];

export function MyRouter() {
  const environment = useRelayEnvironment();

  console.debug('MyRouter', getId(environment));

  const routes = preparePreloadableRoutes(MY_ROUTES, {
    getEnvironment() {
      console.debug('preparePreloadableRoutes getEnvironment', getId(environment));
      return environment;
    },
  });

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}