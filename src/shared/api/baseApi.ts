import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICompany } from '../model/types';

export const baseApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://certain-hushed-fog.glitch.me' }),
  tagTypes: ['Companies'],
  endpoints: (builder) => ({
    getCompanies: builder.query<ICompany[], number>({
      query: (page) => ({
        url: '/companies',
        method: 'GET',
        params: {
          _page: page,
          _limit: 15,
          _sort: 'id',
          _order: 'desc'
        }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, {arg}) => {
        if (arg === 1) {
          return newItems;
        } else {
          currentCache.push(...newItems)
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Companies' as const, id })),
              'Companies',
            ]
          : ['Companies'],
    }),
  }),
})

export const { useGetCompaniesQuery } = baseApi;
