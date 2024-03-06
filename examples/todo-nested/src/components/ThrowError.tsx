import {ReactElement} from 'react';

export default function ThrowError(): ReactElement {
  throw new Error("Oops!")
}