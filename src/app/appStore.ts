import { baseApi } from '@/shared/api/baseApi';
import scrollSlice from '@/features/CompaniesTable/model/scrollSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = ({
  scroll: scrollSlice,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
