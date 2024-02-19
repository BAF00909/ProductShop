import { IProvider } from "../store/slices/types";
import { baseApi } from "./api";

export const providersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProviders: builder.query({
            query: () => '/Provider'
        }),
        getProvider: builder.query({
            query: (id: number | string | bigint) => `/Provider/${id}`
        }),
        addProvider: builder.mutation({
            query: (position: IProvider) => ({
                url: '/Provider',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(position)
            })
        }),
        updateProvider: builder.mutation({
            query: (position: IProvider) => ({
                url: '/Provider',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(position)
            })
        }),
        deleteProvider: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/Provider/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { 
    useGetAllProvidersQuery,
    useGetProviderQuery,
    useAddProviderMutation,
    useUpdateProviderMutation,
    useDeleteProviderMutation
} = providersApi;