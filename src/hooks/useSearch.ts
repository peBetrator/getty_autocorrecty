import { GIFObject, SearchOptions } from 'giphy-api';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import { search } from '../api';
import { ServerStateKeys } from '../constants/server-state-keys';
import { SearchParams } from './types';

type UseSearch = {
  fetch: ({ search }: SearchParams) => void;
  data?: GIFObject[];
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
};

export default function useSearch(): UseSearch {
  const [params, setParams] = useState({} as SearchOptions);

  const { data, isLoading, isFetching, isSuccess } = useQuery(
    [ServerStateKeys.SEARCH, params],
    () => search(params),
    {
      enabled: !!params.q,
    }
  );

  const fetch = useCallback(({ search, ...rest }: SearchParams) => {
    if (search) {
      setParams({ q: search, rating: 'g', ...rest });
    }
  }, []);

  return { fetch, data: data?.data.data, isLoading, isFetching, isSuccess };
}
