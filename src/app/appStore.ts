import { baseApi } from '@/shared/api/baseApi';
import { configureStore } from '@reduxjs/toolkit';
import scrollSlice from '@/features/CompaniesTable/model/scrollSlice';
import checkCompany from '@/features/CompaniesTable/model/checkedCompaniesSlice';
import checkEmployee from '@/features/EmployeesTable/model/checkedEmployeesSlice';
import addCompanyPopup from '@/features/AddCompanyPopup/model/addCompanyPopupSlice';
import addEmployeePopup from '@/features/AddEmployeePopup/model/addEmployeePopupSlice';

const rootReducer = ({
  scroll: scrollSlice,
  checkedCompanies: checkCompany,
  checkedEployees: checkEmployee,
  addCompanyPopup: addCompanyPopup,
  addEmployeePopup: addEmployeePopup,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
