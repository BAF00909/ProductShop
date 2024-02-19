import { IReason } from "../store/slices/types";
import { baseApi } from "./api";

export const productGroupsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReason: builder.query({
            query: () => '/ReasonReturn'
        }),
        getReason: builder.query({
            query: (id: number | string | bigint) => `/ReasonReturn/${id}`
        }),
        addReason: builder.mutation({
            query: (position: IReason) => ({
                url: '/ReasonReturn',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(position)
            })
        }),
        updateReason: builder.mutation({
            query: (position: IReason) => ({
                url: '/ReasonReturn',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(position)
            })
        }),
        deleteReason: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/ReasonReturn/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { 
    useGetAllReasonQuery,
    useGetReasonQuery,
    useAddReasonMutation,
    useUpdateReasonMutation,
    useDeleteReasonMutation
} = productGroupsApi;