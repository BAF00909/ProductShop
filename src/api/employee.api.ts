import { IEmployee, IEmployeeData } from "../store/slices/types";
import { baseApi } from "./api";

export const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query<IEmployeeData[], string>({
            query: () => '/Employee'
        }),
        getEmployeeById: builder.query({
            query: (id: number | string | bigint) => `/Employee/${id}`
        }),
        addEmployee: builder.mutation({
            query: (employee: IEmployee) => ({
                url: '/Employee',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(employee)
            })
        }),
        removeEmployee: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/Employee/${id}`,
                method: 'DELETE',
            })
        }),
        updateEmployee: builder.mutation({
            query: (employee: IEmployee) => ({
                url: '/Employee',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(employee)
            })
        })
    })
})

export const { useGetAllEmployeesQuery, useAddEmployeeMutation, useRemoveEmployeeMutation, useUpdateEmployeeMutation, useGetEmployeeByIdQuery } = employeeApi;