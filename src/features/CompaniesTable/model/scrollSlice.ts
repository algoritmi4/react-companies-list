import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1
}

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setPaginationPage: (state) => ({
      page: state.page + 1
    }),
    resetPaginationPage: () => ({
      page: 1
    })
  }
})

export const { setPaginationPage, resetPaginationPage } = scrollSlice.actions;

export default scrollSlice.reducer;
