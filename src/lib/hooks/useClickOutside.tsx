// useClickOutside.ts
import { useEffect, RefObject, useCallback } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void): void => {
  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useClickOutside;
