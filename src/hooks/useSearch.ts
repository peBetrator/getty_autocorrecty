import { AxiosResponse } from 'axios';
import { GIFObject, MultiResponse, SearchOptions } from 'giphy-api';
import { useCallback, useState } from 'react';
import {
  FetchNextPageOptions,
  InfiniteData,
  useInfiniteQuery,
} from 'react-query';

import { search } from '../api';
import { ServerStateKeys } from '../constants/server-state-keys';
import { SearchParams } from './types';

type UseSearch = {
  fetch: ({ search }: SearchParams) => void;
  fetchNextPage: (options?: FetchNextPageOptions) => void;
  data?: GIFObject[];
  hasNextPage?: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
};

const concatPages = (response?: InfiniteData<AxiosResponse<MultiResponse>>) =>
  response?.pages.reduce(
    (allPages, { data: { data } }) => allPages.concat(...data),
    [] as GIFObject[]
  );

export default function useSearch(): UseSearch {
  const [params, setParams] = useState({} as SearchOptions);

  const { data, isLoading, isFetching, isSuccess, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      [ServerStateKeys.SEARCH, params],
      ({ pageParam = 0 }) => search({ ...params, offset: pageParam }),
      {
        enabled: !!params.q,
        keepPreviousData: true,
        // Calculate if next page exists
        getNextPageParam: ({
          data: {
            pagination: { offset, count, total_count },
          },
        }) => (total_count > offset ? offset + count : undefined),
      }
    );

  const fetch = useCallback(({ search, ...rest }: SearchParams) => {
    if (search) {
      setParams({ q: search, rating: 'g', ...rest });
    }
  }, []);

  return {
    fetch,
    fetchNextPage,
    data: concatPages(data),
    hasNextPage,
    isLoading,
    isFetching,
    isSuccess,
  };
}
