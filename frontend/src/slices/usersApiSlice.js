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
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['User'],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE',
      }),
      providesTags: ['User'],
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} = productApiSlice
