import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: number;
};

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
  refetchOnFocus: true,
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => ({
        url: 'users', // Corrected: Return query object instead of string
        method: 'GET',
      }),
    }),
    getUserById: builder.query<User, { id: string }>({
        query: ({ id }) => ({
          url: `users/${id}`, // Return query object with url and method
          method: 'GET',
        }),
      }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = builderApi;