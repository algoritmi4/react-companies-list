import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit: 15
}

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setPaginationStart: (state) => ({
      limit: state.limit + 15
    })
  }
})

export const { setPaginationStart } = scrollSlice.actions;

export default scrollSlice.reducer;
