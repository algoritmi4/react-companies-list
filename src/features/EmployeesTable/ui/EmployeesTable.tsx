import { EmployeesTableRow } from "@/entities/EmployeesTableRow";
import { TableHeader } from "@/entities/TableHeader";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { ICompany, IEmployees } from "@/shared/model/types";
import { Preloader } from "@/shared/ui/Preloader";
import { ReactElement } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDeleteEmployeesMutation } from "../api/employeesApi";
import { resetPaginationPage } from "@/features/CompaniesTable/model/scrollSlice";
import { recheckCompany } from "@/features/CompaniesTable/model/checkedCompaniesSlice";
import { uncheckAllEmployees } from "../model/checkedEmployeesSlice";
import { AddEmployeePopup } from "@/features/AddEmployeePopup/ui/AddEmployeePopup";
import { setIsEmployeePopupOpen } from "@/features/AddEmployeePopup/model/addEmployeePopupSlice";

interface IEmployeesTable {
  company: ICompany;
}

export function EmployeesTable({ company }: IEmployeesTable): ReactElement {
  const employees = company.employees.map((employee, index) => <EmployeesTableRow key={index} employee={employee} />).reverse();
  const { checkedEmployees } = useAppSelector((state) => state.checkedEployees);
  const { isOpen } = useAppSelector((state) => state.addEmployeePopup);
  const dispatch = useAppDispatch();
  const [ deleteEmployees ] = useDeleteEmployeesMutation();
  const { isAllChecked } = useAppSelector((state) => state.checkedEployees);

  function handleOpenModal() {
    dispatch(setIsEmployeePopupOpen());
  }

  function handleDeleteEmployees() {
    const uncheckedEmployees: IEmployees[] = [];
    company.employees.forEach((el) => {
      if (checkedEmployees.includes(el)) {
        return
      }

      uncheckedEmployees.push(el);
    })

    dispatch(resetPaginationPage());
    deleteEmployees({...company, employees: uncheckedEmployees})
    .unwrap()
    .then((res) => {
      dispatch(recheckCompany(res));
      dispatch(uncheckAllEmployees());
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className="w-2/5 border-solid border-1 flex flex-col p-3">
      {
        isOpen && <AddEmployeePopup company={company} />
      }
      <div className="flex self-end mr-4">
        <button onClick={handleOpenModal} type="button" className="px-3 py-1 bg-green-500 rounded-[10px] border-black border-2 border-solid">Добавить</button>
        <button onClick={handleDeleteEmployees} type="button" className={`px-3 py-1 rounded-[10px] ml-2 ${checkedEmployees.length === 0 ? "bg-gray-500" : "bg-red-500"}`} disabled={checkedEmployees.length === 0}>Удалить</button>
      </div>
      <InfiniteScroll
        dataLength={company.employees.length}
        hasMore={false}
        next={() => {}}
        loader={<Preloader />}
        height={870}
      >
        <TableHeader employees={company.employees} isAllChecked={isAllChecked} secondColumnText="Фамилия" thirdColumnText="Имя" fourthColumnText="Должность" />
        {employees}
      </InfiniteScroll>
    </div>
  )
}
