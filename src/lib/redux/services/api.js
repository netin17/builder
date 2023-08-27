import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery = ({ baseUrl }) => async ({ url, method, data }) => {
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

export const customApi = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
});