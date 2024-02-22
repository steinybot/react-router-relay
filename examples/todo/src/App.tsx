import 'todomvc-common';
import * as React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {createRoot} from 'react-dom/client';
import {MyRouter} from './MyRouter';
import {MutableRelayEnvironment} from './MutableRelayEnvironment';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <MutableRelayEnvironment>
    <React.Suspense fallback={<div>Loading</div>}>
      <ErrorBoundary fallbackRender={({error}) => <div>{error.message}</div>}>
        <MyRouter />
      </ErrorBoundary>
    </React.Suspense>
  </MutableRelayEnvironment>,
);