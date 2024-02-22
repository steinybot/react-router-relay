import * as React from 'react';
import {createContext, ReactNode, useState} from 'react';
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

function createNewEnvironment() {
  return new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
}

export const MutableRelayEnvironmentContext = createContext<() => void>(() => {
});

export interface Props {
  children: ReactNode;
}

export function MutableRelayEnvironment(props: Props) {
  const [environment, setEnvironment] = useState(createNewEnvironment);

  function setNewEnvironment() {
    setEnvironment(createNewEnvironment());
  }

  return <MutableRelayEnvironmentContext.Provider value={setNewEnvironment}>
    <RelayEnvironmentProvider environment={environment}>
      {props.children}
    </RelayEnvironmentProvider>
  </MutableRelayEnvironmentContext.Provider>;
}