import { checkAllCompanies, uncheckAllCompanies } from "@/features/CompaniesTable/model/checkedCompaniesSlice";
import { checkAllEmployees, uncheckAllEmployees } from "@/features/EmployeesTable/model/checkedEmployeesSlice";
import { useAppDispatch } from "@/shared/model/hooks";
import { ICompany, IEmployees } from "@/shared/model/types";
import { ChangeEvent, ReactElement } from "react";

interface ITableHeaderProps {
  companies?: ICompany[];
  employees?: IEmployees[];
  isAllChecked: boolean;
  secondColumnText: string;
  thirdColumnText: string;
  fourthColumnText: string;
}

export function TableHeader({ companies, employees, isAllChecked, secondColumnText, thirdColumnText, fourthColumnText }: ITableHeaderProps): ReactElement {
  const dispatch = useAppDispatch();

  function checkAll(e: ChangeEvent<HTMLInputElement>) {
    companies
    ? e.target.checked ? dispatch(checkAllCompanies(companies)) : dispatch(uncheckAllCompanies())
    : e.target.checked && employees ? dispatch(checkAllEmployees(employees)) : dispatch(uncheckAllEmployees());
  }

  return (
    <div className="w-full border-solid border-1 flex mt-2">
      <div className="w-1/5 px-1 py-2 flex items-center justify-center">
        <label className="cursor-pointer" htmlFor="check">Выбрать все</label>
        <input onChange={checkAll} className="w-5 h-5 ml-2 cursor-pointer" type="checkbox" id="check" checked={isAllChecked}/>
      </div>
      <div className="w-1/5 px-1 py-2">
        <p className="text-lg">{secondColumnText}</p>
      </div>
      <div className="w-1/5 px-1 py-2">
        <p className="text-lg">{thirdColumnText}</p>
      </div>
      <div className="w-1/5 px-1 py-2">
        <p className="text-lg">{fourthColumnText}</p>
      </div>
      <div className="w-1/5 px-1 py-2 text-center">
        <p className="text-lg">Редактировать</p>
      </div>
    </div>
  )
}
