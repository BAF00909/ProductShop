import { IEmployee, IEmployeeData } from "../store/slices/types";
import { baseApi } from "./api";

export const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query<IEmployeeData[], string>({
            query: () => '/Employee'
        }),
        addEmployee: builder.mutation({
            query: (employee: IEmployee) => ({
                url: '/Employee',
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;'
                },
                body: JSON.stringify(employee)
            })
        })
    })
})

export const { useGetAllEmployeesQuery, useAddEmployeeMutation } = employeeApi;