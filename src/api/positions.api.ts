import { IPosition } from "../store/slices/types";
import { baseApi } from "./api";

export const positionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPositions: builder.query({
            query: () => '/Position'
        }),
        getPosition: builder.query({
            query: (id: number | string | bigint) => `/Position/${id}`
        }),
        addPosition: builder.mutation({
            query: (position: IPosition) => ({
                url: '/Position',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(position)
            })
        }),
        updatePosition: builder.mutation({
            query: (position: IPosition) => ({
                url: '/Position',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(position)
            })
        }),
        deletePosition: builder.mutation({
            query: (id: number | string | bigint) => ({
                url: `/Position/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetAllPositionsQuery, useAddPositionMutation, useUpdatePositionMutation, useDeletePositionMutation, useGetPositionQuery } = positionsApi;