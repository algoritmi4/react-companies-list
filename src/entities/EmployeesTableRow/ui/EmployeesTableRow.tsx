import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { IEmployees } from "@/shared/model/types";
import { ChangeEvent, ReactElement } from "react";
import { checkEmployee, uncheckEmployee } from "../../../features/EmployeesTable/model/checkedEmployeesSlice";

interface IEmployeesTableRow {
  employee: IEmployees;
}

export function EmployeesTableRow({ employee }: IEmployeesTableRow): ReactElement {
  const { checkedEmployees } = useAppSelector((state) => state.checkedEployees)
  const dispatch = useAppDispatch();

  const isEmployeeChecked = checkedEmployees.includes(employee);

  function handleCheckedState(e: ChangeEvent<HTMLInputElement>) {
    e.target.checked
    ? dispatch(checkEmployee(employee))
    : dispatch(uncheckEmployee(employee.id));
  }

  return (
    <div className={`w-full border-solid border-black border-2 flex py-5 ${isEmployeeChecked && "bg-blue-500"}`}>
      <label className="w-1/4 flex items-center justify-center cursor-pointer">
        <input type="checkbox" className="w-5 h-5 cursor-pointer" onChange={handleCheckedState} checked={isEmployeeChecked} />
      </label>
      <div className="w-1/4 overflow-hidden">
        <p className="text-lg truncate">{employee.last_name}</p>
      </div>
      <div className="w-1/4 overflow-hidden">
        <p className="text-lg truncate">{employee.name}</p>
      </div>
      <div className="w-1/4 overflow-hidden">
        <p className="text-lg truncate">{employee.position}</p>
      </div>
    </div>
  )
}
