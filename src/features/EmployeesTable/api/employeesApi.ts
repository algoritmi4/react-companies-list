import { baseApi } from "@/shared/api/baseApi";
import { ICompany, IEmployees } from "@/shared/model/types";

interface IAddEmployeeEmployees {
  last_name: string;
  name: string;
  position: string;
}

interface IAddEmployeeRequest {
  company: string;
  id: number;
  address: string;
  employees: (IAddEmployeeEmployees | IEmployees)[];
}

const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteEmployees: builder.mutation<ICompany, ICompany>({
      query: (company) => ({
        url: `/companies/${company.id}`,
        method: 'PATCH',
        body: company
      }),
      invalidatesTags: ['Companies']
    }),
    addEmployee: builder.mutation<ICompany, IAddEmployeeRequest>({
      query: (company) => ({
        url: `/companies/${company.id}`,
        method: 'PATCH',
        body: company
      }),
      invalidatesTags: ['Companies']
    }),
    updateEmployee: builder.mutation<ICompany, IAddEmployeeRequest>({
      query: (company) => ({
        url: `/companies/${company.id}`,
        method: 'PATCH',
        body: company
      }),
      invalidatesTags: ['Companies']
    })
  })
})

export const { useDeleteEmployeesMutation, useAddEmployeeMutation, useUpdateEmployeeMutation } = employeesApi;
