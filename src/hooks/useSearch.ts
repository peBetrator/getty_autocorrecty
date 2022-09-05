import { AxiosResponse } from 'axios';
import { MultiResponse, SearchOptions } from 'giphy-api';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import { search } from '../api';
import { ServerStateKeys } from '../constants/server-state-keys';
import { SearchParams } from './types';

type UseSearch = {
  fetch: ({ search }: SearchParams) => void;
  data?: AxiosResponse<MultiResponse>;
  isLoading: boolean;
  isFetching: boolean;
};

export default function useSearch(): UseSearch {
  const [params, setParams] = useState({} as SearchOptions);

  const { data, isLoading, isFetching } = useQuery(
    [ServerStateKeys.SEARCH, params],
    () => search(params),
    {
      enabled: !!params.q,
    }
  );

  const fetch = useCallback(({ search }: SearchParams) => {
    if (search) {
      setParams({ q: search, rating: 'g' });
    }
  }, []);

  return { fetch, data, isLoading, isFetching };
}
