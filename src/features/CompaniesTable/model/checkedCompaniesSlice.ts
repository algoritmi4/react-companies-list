import { ICompany } from "@/shared/model/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  checkedCompanies: ICompany[] | never[];
  isAllChecked: boolean;
}

const initialState: IInitialState = {
  checkedCompanies: [],
  isAllChecked: false
};

const checkedCompaniesSlice = createSlice({
  name: 'checkedCompanies',
  initialState,
  reducers: {
    checkCompany: (state, { payload: company }: { payload: ICompany }) => ({
      ...state, checkedCompanies: [...state.checkedCompanies, company]
    }),
    recheckCompany: (state, { payload: company }: { payload: ICompany}) => {
      const newCompaniesArr = state.checkedCompanies.slice(0, state.checkedCompanies.length - 1);

      return {...state, checkedCompanies: [...newCompaniesArr, company] };
    },
    uncheckCompany: (state, { payload: companyId }: { payload: number }) => ({
      ...state, checkedCompanies: state.checkedCompanies.filter((el) => el.id !== companyId)
    }),
    checkAllCompanies: (state, { payload: companies }: { payload: ICompany[]}) => ({
      isAllChecked: true, checkedCompanies: companies,
    }),
    uncheckAllCompanies: () => ({
      isAllChecked: false, checkedCompanies: []
    })
  }
})

export const { checkCompany, uncheckCompany, recheckCompany, checkAllCompanies, uncheckAllCompanies } = checkedCompaniesSlice.actions;

export default checkedCompaniesSlice.reducer;
