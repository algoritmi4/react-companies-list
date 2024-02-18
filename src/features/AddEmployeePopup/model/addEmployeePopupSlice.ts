import { IEmployees } from "@/shared/model/types";
import { createSlice } from "@reduxjs/toolkit";

interface ISetOpenPayload {
  values: IEmployees;
  isEdit: boolean;
  companyId: number;
}

interface IInitialState {
  isOpen: boolean;
  values: IEmployees;
  isEdit: boolean;
  companyId: number;
}

const initialState: IInitialState = {
  isOpen: false,
  values: {last_name: '', name: '', position: '', id: 0},
  isEdit: false,
  companyId: 0
}

const addEmployeePopupSlice = createSlice({
  name: 'addEmployeePopup',
  initialState,
  reducers: {
    setIsEmployeePopupOpen: (state, { payload: { values, isEdit, companyId } }: { payload: ISetOpenPayload }) => ({
      isOpen: true, values: values, isEdit, companyId
    }),
    setIsEmployeePopupClose: (state) => ({
      ...state, isOpen: false, values: {last_name: '', name: '', position: '', id: 0}
    })
  }
})

export const { setIsEmployeePopupOpen, setIsEmployeePopupClose } = addEmployeePopupSlice.actions;

export default addEmployeePopupSlice.reducer;
