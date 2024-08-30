import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlices'
import cartSliceReducr from './slices/cartSlice'
import authSliceReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducr,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
