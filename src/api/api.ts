import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7197/api/' }),
    endpoints: () => ({}),
});
