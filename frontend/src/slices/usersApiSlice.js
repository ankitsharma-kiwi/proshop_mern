import { USERS_URL } from '../helper/constant';
import { apiSlice } from './apiSlices';

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useLoginMutation
} = productApiSlice;