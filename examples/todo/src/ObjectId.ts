var id = 0;

export function addId<A>(object: A): A {
  const o = object as any

  if (typeof o.__uniqueid != 'undefined') {
    return object;
  }

  Object.defineProperty(o, '__uniqueid', {
    value: ++id,
    enumerable: false,
    writable: false,
  });

  return object;
}

export function getId<A>(object: A): number {
  const o = object as any

  if (typeof o.__uniqueid != 'undefined') {
    return o.__uniqueid;
  }

  Object.defineProperty(o, '__uniqueid', {
    value: ++id,
    enumerable: false,
    writable: false,
  });

  return o.__uniqueid;
}