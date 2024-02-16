import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: 0
}

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setPaginationStart: (state) => ({
      start: state.start + 15
    })
  }
})

export const { setPaginationStart } = scrollSlice.actions;

export default scrollSlice.reducer;
