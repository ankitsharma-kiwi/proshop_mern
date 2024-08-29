import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlices'
import cartSliceReducr from './slices/cartSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducr,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
