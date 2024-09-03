import { apiSlice } from './apiSlices'
import { ORDERS_URL } from '../helper/constant'

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = orderApiSlice
