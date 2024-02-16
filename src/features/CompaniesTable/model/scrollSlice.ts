import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit: 15
}

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setPaginationLimit: (state) => ({
      limit: state.limit + 15
    })
  }
})

export const { setPaginationLimit } = scrollSlice.actions;

export default scrollSlice.reducer;
