import { IEmployee } from "../store/slices/types";
import { baseApi } from "./api";

export const positionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPositions: builder.query({
            query: () => '/Position'
        }),
        addPosition: builder.mutation({
            query: (position: IEmployee) => ({
                url: '/Position',
                method: 'POST',
                body: JSON.stringify(position)
            })
        })
    })
})

export const { useGetAllPositionsQuery } = positionsApi;