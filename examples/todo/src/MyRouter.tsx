import * as React from 'react';
import {type EntryPointRouteObject, preparePreloadableRoutes} from '@loop-payments/react-router-relay';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import TodoAppEntryPoint from './entrypoints/TodoApp.entrypoint';
import {useLayoutEffect, useMemo, useRef} from 'react';
import {useRelayEnvironment} from 'react-relay';

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
  // Potentially unnecessary if you never change your environment
  const environmentRef = useRef(environment);
  useLayoutEffect(() => {
    environmentRef.current = environment;
  }, []);

  const router = useMemo(() => {
    const routes = preparePreloadableRoutes(MY_ROUTES, {
      getEnvironment() {
        return environmentRef.current;
      },
    });

    return createBrowserRouter(routes);
  }, []);

  return <RouterProvider router={router} />;
}