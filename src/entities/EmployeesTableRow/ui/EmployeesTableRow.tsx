import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { IEmployees } from "@/shared/model/types";
import { ChangeEvent, ReactElement } from "react";
import { checkEmployee, uncheckEmployee } from "../../../features/EmployeesTable/model/checkedEmployeesSlice";

interface IEmployeesTableRow {
  employee: IEmployees;
  handleOpenEditPopup: (employee: IEmployees) => void;
}

export function EmployeesTableRow({ employee, handleOpenEditPopup }: IEmployeesTableRow): ReactElement {
  const { checkedEmployees } = useAppSelector((state) => state.checkedEployees)
  const dispatch = useAppDispatch();

  const isEmployeeChecked = checkedEmployees.includes(employee);

  function handleCheckedState(e: ChangeEvent<HTMLInputElement>) {
    e.target.checked
    ? dispatch(checkEmployee(employee))
    : dispatch(uncheckEmployee(employee.id));
  }

  return (
    <div className={`w-full border-x-solid border-1 border-b-solid flex py-5 px-1 ${isEmployeeChecked && "bg-blue-500"}`}>
      <label className="w-1/5 flex items-center justify-center cursor-pointer px-1">
        <input type="checkbox" className="w-5 h-5 cursor-pointer" onChange={handleCheckedState} checked={isEmployeeChecked} />
      </label>
      <div className="w-1/5 overflow-hidden px-1">
        <p className="text-lg truncate">{employee.last_name}</p>
      </div>
      <div className="w-1/5 overflow-hidden px-1">
        <p className="text-lg truncate">{employee.name}</p>
      </div>
      <div className="w-1/5 overflow-hidden px-1">
        <p className="text-lg truncate">{employee.position}</p>
      </div>
      <div className="w-1/5 flex items-center justify-center">
        <div onClick={() => handleOpenEditPopup(employee)} className="bg-edit-icon w-8 h-8 cursor-pointer"></div>
      </div>
    </div>
  )
}
