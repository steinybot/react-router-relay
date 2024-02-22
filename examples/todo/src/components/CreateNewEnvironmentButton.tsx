import * as React from 'react';
import {useContext} from 'react';
import {MutableRelayEnvironmentContext} from '../MutableRelayEnvironment';

export function CreateNewEnvironmentButton() {
  const createNewEnvironment = useContext(MutableRelayEnvironmentContext);
  return <button className='create-new-environment' onClick={createNewEnvironment}>Create new environment</button>
}