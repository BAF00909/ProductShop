import { IOverdueProduct, IOverdueProductData, IOverdueProductUpdate, IReturnedProduct, IReturnedProductData, IReturnedProductUpdate } from "../store/slices/types";
import { baseApi } from "./api";

export const returnedProductsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReturnedProducts: builder.query<IReturnedProduct[], string>({
            query: () => '/ReturnedProducts'
        }),
        getReturnedProductById: builder.query<IReturnedProduct, number | string | bigint>({
            query: (id: number | string | bigint) => `/ReturnedProducts/${id}`
        }),
        addReturnedProduct: builder.mutation({
            query: (employee: IReturnedProductData) => ({
                url: '/ReturnedProducts',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(employee)
            })
        }),
        removeReturnedProduct: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/ReturnedProducts/${id}`,
                method: 'DELETE',
            })
        }),
        updateReturnedProduct: builder.mutation({
            query: (product: IReturnedProductUpdate) => ({
                url: '/ReturnedProducts',
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
    useGetAllReturnedProductsQuery,
    useGetReturnedProductByIdQuery,
    useAddReturnedProductMutation,
    useUpdateReturnedProductMutation,
    useRemoveReturnedProductMutation
} = returnedProductsApi;