import { ICompany } from "@/shared/model/types";
import { createSlice } from "@reduxjs/toolkit";

interface ISetOpenPayload {
  values: ICompany;
  isEdit: boolean;
}

interface IInitialStateValues {
  company: string;
  address: string;
}

interface IInitialState {
  isOpen: boolean;
  values: IInitialStateValues;
  isEdit: boolean;
  companyId: number;
}

const initialState: IInitialState = {
  isOpen: false,
  values: {company: '', address: ''},
  isEdit: false,
  companyId: 0
}

const addCompanyPopupSlice = createSlice({
  name: 'addCompanyPopup',
  initialState,
  reducers: {
    setIsCompanyPopupOpen: (state, { payload: { values, isEdit } }: { payload: ISetOpenPayload }) => ({
      isOpen: true, values: {company: values.company, address: values.address}, isEdit, companyId: values.id
    }),
    setIsCompanyPopupClose: (state) => ({
      ...state, isOpen: false, values: {company: '', address: ''}
    })
  }
})

export const { setIsCompanyPopupOpen, setIsCompanyPopupClose } = addCompanyPopupSlice.actions;

export default addCompanyPopupSlice.reducer;
