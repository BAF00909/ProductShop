import { IOverdueProduct, IOverdueProductData, IOverdueProductUpdate } from "../store/slices/types";
import { baseApi } from "./api";

export const overdueProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOverdueProducts: builder.query<IOverdueProduct[], string>({
            query: () => '/OverdueProducts'
        }),
        getOverdueProductById: builder.query<IOverdueProduct, number | string | bigint>({
            query: (id: number | string | bigint) => `/OverdueProducts/${id}`
        }),
        addOverdueProduct: builder.mutation({
            query: (employee: IOverdueProductData) => ({
                url: '/OverdueProducts',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(employee)
            })
        }),
        removeOverdueProduct: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/OverdueProducts/${id}`,
                method: 'DELETE',
            })
        }),
        updateOverdueProduct: builder.mutation({
            query: (product: IOverdueProductUpdate) => ({
                url: '/OverdueProducts',
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
    useGetAllOverdueProductsQuery,
    useGetOverdueProductByIdQuery,
    useAddOverdueProductMutation,
    useUpdateOverdueProductMutation,
    useRemoveOverdueProductMutation
} = overdueProductApi;