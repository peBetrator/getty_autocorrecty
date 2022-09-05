import { MultiResponse, SearchOptions } from 'giphy-api';

import API from '../api';

export const search = (params: SearchOptions) =>
  API.get<MultiResponse>('/search', { params });

export const trending = (params: Omit<SearchOptions, 'q' | 'offset'>) =>
  API.get<MultiResponse>('/trending', { params });
