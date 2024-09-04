import { USERS_URL } from '../helper/constant'
import { apiSlice } from './apiSlices'

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileQuery, useUpdateProfileMutation } = productApiSlice
