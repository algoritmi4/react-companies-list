import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICompany } from '../model/types';

export const baseApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://certain-hushed-fog.glitch.me' }),
  endpoints: (builder) => ({
    getCompanies: builder.query<ICompany[], number>({
      query: (start) => ({
        url: '/companies',
        method: 'GET',
        params: {
          _start: start,
          _limit: 15
        }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      }
    }),
  }),
})

export const { useGetCompaniesQuery, useLazyGetCompaniesQuery } = baseApi;
