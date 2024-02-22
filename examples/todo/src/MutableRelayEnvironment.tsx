import * as React from 'react';
import {createContext, ReactNode} from 'react';
import {
  Environment,
  type GraphQLResponse,
  Network,
  RecordSource,
  type RequestParameters,
  Store,
  type Variables,
} from 'relay-runtime';
import {RelayEnvironmentProvider} from 'react-relay';

const ThemeContext = createContext('light');

async function fetchQuery(params: RequestParameters, variables: Variables): Promise<GraphQLResponse> {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      queryId: params.id,
      variables,
    }),
  });
  return response.json();
}

export interface Props {
  children: ReactNode;
}

export function MutableRelayEnvironment(props: Props) {
  const modernEnvironment: Environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });

  return <RelayEnvironmentProvider environment={modernEnvironment}>
    {props.children}
  </RelayEnvironmentProvider>;
}