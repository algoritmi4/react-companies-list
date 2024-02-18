import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
}

const addEmployeePopupSlice = createSlice({
  name: 'addEmployeePopup',
  initialState,
  reducers: {
    setIsEmployeePopupOpen: () => ({
      isOpen: true
    }),
    setIsEmployeePopupClose: () => ({
      isOpen: false
    })
  }
})

export const { setIsEmployeePopupOpen, setIsEmployeePopupClose } = addEmployeePopupSlice.actions;

export default addEmployeePopupSlice.reducer;
