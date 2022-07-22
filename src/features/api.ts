import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GITHUB_API_URL } from '@constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: GITHUB_API_URL }),
  endpoints: (builder) => ({
    getGithubInfo: builder.query<any, string>({
      query: (name) => name,
    }),
  }),
});

export const { useGetGithubInfoQuery } = api;
