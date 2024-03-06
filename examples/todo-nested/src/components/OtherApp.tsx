import type {OtherAppQuery} from '../../__generated__/relay/OtherAppQuery.graphql';
import {graphql, usePreloadedQuery} from 'react-relay';
import TodoList from './TodoList';
import * as React from 'react';
import {SimpleEntryPointProps} from '@loop-payments/react-router-relay';
import {Link, Outlet} from 'react-router-dom';

type PreloadedQueries = {
  otherAppQueryRef: OtherAppQuery;
};
type Props = SimpleEntryPointProps<PreloadedQueries>;

function OtherApp({queries}: Props): React.ReactNode {
  const {user} = usePreloadedQuery<OtherAppQuery>(graphql`
      query OtherAppQuery($userId: String!, $status: String) @preloadable {
        user(id: $userId) @required(action: THROW) {
          ...TodoList_user
        }
      }
    `, queries.otherAppQueryRef);

  return <div>
    <section className="otherApp">
      <TodoList userRef={user} />
    </section>

    <Outlet />

    <Link to="/others/error">Crash!</Link>
    <br />
    <Link to="/todos">Todos</Link>

    <footer className="info">
      <p>Double-click to edit a todo</p>

      <p>
        Created by the{' '}
        <a href="https://facebook.github.io/relay/">Relay team</a>
      </p>

      <p>
        Part of <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>;
}

export default OtherApp;
