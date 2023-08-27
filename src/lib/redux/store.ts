import { configureStore } from '@reduxjs/toolkit'
import { builderApi } from './services/builderApi'
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    [builderApi.reducerPath]: builderApi.reducer
  },
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({}).concat([builderApi.middleware]),
});
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch