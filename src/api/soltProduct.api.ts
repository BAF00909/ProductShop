import { ISoltProduct, ISoltProductData, ISoltProductUpdate } from "../store/slices/types";
import { baseApi } from "./api";

export const soltProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSoltProducts: builder.query<ISoltProduct[], string>({
            query: () => '/SoltProducts'
        }),
        getSoltProductById: builder.query<ISoltProduct, number | string | bigint>({
            query: (id: number | string | bigint) => `/SoltProducts/${id}`
        }),
        addSoltProduct: builder.mutation({
            query: (employee: ISoltProductData) => ({
                url: '/SoltProducts',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(employee)
            })
        }),
        removeSoltProduct: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/SoltProducts/${id}`,
                method: 'DELETE',
            })
        }),
        updateSoltProduct: builder.mutation({
            query: (product: ISoltProductUpdate) => ({
                url: '/SoltProducts',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(product)
            })
        })
    })
})

export const {
    useGetAllSoltProductsQuery,
    useGetSoltProductByIdQuery,
    useAddSoltProductMutation,
    useUpdateSoltProductMutation,
    useRemoveSoltProductMutation
} = soltProductApi;