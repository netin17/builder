import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

type Builder = any;

// Define the custom base query function using Axios
const axiosBaseQuery = ({ baseUrl }: { baseUrl: string }) => async ({ url, method, data }: { url: string, method: string, data?: any }) => {
  const result = await axios({
    baseURL: baseUrl,
    url,
    method,
    data,
  });

  return {
    data: result.data,
  };
};

export const builderApi = createApi({
  reducerPath: 'builderApi',
  refetchOnFocus: false,
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
  }),
  endpoints: (builder) => ({
    getBuilder: builder.query<Builder, {slug:string}>({
      query: ({slug}) => ({
        url: `builder/${slug}`, // Corrected: Return query object instead of string
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetBuilderQuery } = builderApi;