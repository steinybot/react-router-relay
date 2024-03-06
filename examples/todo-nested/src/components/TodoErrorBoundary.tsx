import * as React from 'react';
import {Link, useRouteError} from 'react-router-dom';

export default function TodoErrorBoundary() {
  const error = useRouteError() as Error;
  return <>
    <p>{error.message}</p>
    <Link to="">Up</Link>
  </>;
}