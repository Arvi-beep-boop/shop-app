import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { storeApi } from '../api/api.slice'
import { shoppingCartSlice } from './shoppingCart.slice'
import { orderFormSlice } from './orderForm.slice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [storeApi.reducerPath]: storeApi.reducer,
    [shoppingCartSlice.name]: shoppingCartSlice.reducer,
    [orderFormSlice.name]: orderFormSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch