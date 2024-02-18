import { baseApi } from "@/shared/api/baseApi";
import { ICompany } from "@/shared/model/types";

interface IAddCompanyRequest {
  company: string;
  address: string;
  id?: number;
}

const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCompany: builder.mutation<void, number>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Companies', id }]
    }),
    addCompany: builder.mutation<ICompany, IAddCompanyRequest>({
      query: ({ company, address }) => ({
        url: '/companies/',
        method: 'POST',
        body: {
          company,
          address,
          employees: []
        },
      }),
      invalidatesTags: ['Companies']
    }),
    updateCompany: builder.mutation<ICompany, IAddCompanyRequest>({
      query: ({id, company, address}) => ({
        url: `/companies/${id}`,
        method: 'PATCH',
        body: {
          company,
          address
        }
      }),
      invalidatesTags: ['Companies']
    })
  })
})

export const { useDeleteCompanyMutation, useAddCompanyMutation, useUpdateCompanyMutation } = companiesApi;
