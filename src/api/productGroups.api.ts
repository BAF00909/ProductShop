import { IProductGroup } from "../store/slices/types";
import { baseApi } from "./api";

export const productGroupsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProductsGroup: builder.query({
            query: () => '/ProductGroups'
        }),
        getProductGroup: builder.query({
            query: (id: number | string | bigint) => `/ProductGroups/${id}`
        }),
        addProductGroup: builder.mutation({
            query: (position: IProductGroup) => ({
                url: '/ProductGroups',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(position)
            })
        }),
        updateProductGroup: builder.mutation({
            query: (position: IProductGroup) => ({
                url: '/ProductGroups',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(position)
            })
        }),
        deleteProductGroup: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/ProductGroups/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { 
    useGetAllProductsGroupQuery,
    useGetProductGroupQuery,
    useAddProductGroupMutation,
    useUpdateProductGroupMutation,
    useDeleteProductGroupMutation
} = productGroupsApi;