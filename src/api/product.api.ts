import { IProduct, IProductData } from "../store/slices/types";
import { baseApi } from "./api";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProductData[], string>({
            query: () => '/Products'
        }),
        getProductById: builder.query<IProduct, number | string | bigint>({
            query: (id: number | string | bigint) => `/Products/${id}`
        }),
        addProduct: builder.mutation({
            query: (employee: IProductData) => ({
                url: '/Products',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(employee)
            })
        }),
        removeProduct: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/Products/${id}`,
                method: 'DELETE',
            })
        }),
        updateProduct: builder.mutation({
            query: (product: IProductData) => ({
                url: '/Products',
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
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useRemoveProductMutation
} = productApi;