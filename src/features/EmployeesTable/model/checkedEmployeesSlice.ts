import { IEmployees } from "@/shared/model/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isAllChecked: boolean;
  checkedEmployees: IEmployees[];
}

const initialState: IInitialState = {
  isAllChecked: false,
  checkedEmployees: []
};

const checkedEmployeesSlice = createSlice({
  name: 'checkedEmployees',
  initialState,
  reducers: {
    checkEmployee: (state, { payload: employee }: { payload: IEmployees }) => ({
      ...state, checkedEmployees: [...state.checkedEmployees, employee]
    }),
    uncheckEmployee: (state, { payload: employeeId }: { payload: number }) =>({
      ...state, checkedEmployees: state.checkedEmployees.filter((el) => el.id !== employeeId)
    }),
    checkAllEmployees: (state, { payload: employees }: { payload: IEmployees[]}) => ({
      isAllChecked: true, checkedEmployees: employees,
    }),
    uncheckAllEmployees: () => ({
      isAllChecked: false, checkedEmployees: []
    })
  }
})

export const { checkEmployee, uncheckEmployee, checkAllEmployees, uncheckAllEmployees } = checkedEmployeesSlice.actions;

export default checkedEmployeesSlice.reducer;
