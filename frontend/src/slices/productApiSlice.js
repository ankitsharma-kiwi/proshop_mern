import { PRODUCTS_URL, UPLOAD_URL } from '../helper/constant';
import { apiSlice } from './apiSlices';

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: ({ pageNumber }) => ({
                url: PRODUCTS_URL,
                params: { pageNumber }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product'],
        }),  
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `${PRODUCTS_URL}/${product.productId}`,
                method: 'PUT',
                body: product
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product'],
        }), 
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data
            })
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUploadProductImageMutation,
    useCreateReviewMutation
} = productApiSlice;