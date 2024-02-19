import { ISupply, ISupplyUpdate } from "../store/slices/types";
import { baseApi } from "./api";

export const supplyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSupplies: builder.query<ISupply[], string>({
            query: () => '/Supply'
        }),
        getSupplyById: builder.query({
            query: (id: number | string | bigint) => `/Supply/${id}`
        }),
        addSupply: builder.mutation({
            query: (employee: ISupply) => ({
                url: '/Supply',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(employee)
            })
        }),
        removeSupply: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/Supply/${id}`,
                method: 'DELETE',
            })
        }),
        updateSupply: builder.mutation({
            query: (employee: ISupplyUpdate) => ({
                url: '/Supply',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(employee)
            })
        })
    })
})

export const {
    useGetAllSuppliesQuery,
    useGetSupplyByIdQuery,
    useAddSupplyMutation,
    useUpdateSupplyMutation,
    useRemoveSupplyMutation
} = supplyApi;