'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type QueryValue = string | number | boolean | undefined;

export function useParamState<T extends QueryValue>(
  queryKey: string,
  defaultValue: T
): [T, (value: T) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryValue = searchParams.get(queryKey);
  const initialState = queryValue !== null ? (queryValue as unknown as T) : defaultValue;

  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    if (state !== initialState) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (state === defaultValue || state === undefined) {
        newSearchParams.delete(queryKey);
      } else {
        newSearchParams.set(queryKey, String(state));
      }

      const newQueryString = newSearchParams.toString();
      const newUrl = `${window.location.pathname}${newQueryString ? `?${newQueryString}` : ''}`;

      router.push(newUrl);
    }
  }, [state, searchParams, router, queryKey, initialState, defaultValue]);

  return [state, setState];
}