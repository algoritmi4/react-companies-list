import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
}

const addCompanyPopupSlice = createSlice({
  name: 'addCompanyPopup',
  initialState,
  reducers: {
    setIsCompanyPopupOpen: () => ({
      isOpen: true
    }),
    setIsCompanyPopupClose: () => ({
      isOpen: false
    })
  }
})

export const { setIsCompanyPopupOpen, setIsCompanyPopupClose } = addCompanyPopupSlice.actions;

export default addCompanyPopupSlice.reducer;
