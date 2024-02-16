import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICompany } from '../model/types';

export const baseApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://certain-hushed-fog.glitch.me' }),
  endpoints: (builder) => ({
    getCompanies: builder.query<ICompany[], number>({
      query: (limit) => ({
        url: '/companies',
        method: 'GET',
        params: {
          _start: 0,
          _limit: limit
        }
      }),
    }),
  }),
})

export const { useGetCompaniesQuery, useLazyGetCompaniesQuery } = baseApi;
