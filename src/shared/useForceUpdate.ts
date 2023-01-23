import { useCallback, useState } from 'react';

const createNewState = () => ({});

export default function useForceUpdate() {
  const [, setState] = useState(createNewState);

  return useCallback(() => setState(createNewState), []);
}
