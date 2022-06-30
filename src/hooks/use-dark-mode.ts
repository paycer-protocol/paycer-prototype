import { useEffect } from 'react';
import useLocalStorage from './use-local-storage';

export default function useDarkMode() {
  const [enabled, setEnabled] = useLocalStorage<boolean>(
    'dark-mode',
    true,
  );

  useEffect(
    () => {},
    [enabled],
  );

  return {
    enabled,
    setEnabled,
  };
}
