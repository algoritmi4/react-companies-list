import { recheckCompany } from "@/features/CompaniesTable/model/checkedCompaniesSlice";
import { useAddEmployeeMutation } from "@/features/EmployeesTable/api/employeesApi";
import { useAppDispatch } from "@/shared/model/hooks";
import { ICompany } from "@/shared/model/types";
import { Modal } from "@/shared/ui/Modal";
import { ChangeEvent, ReactElement, SyntheticEvent, useState } from "react";
import { setIsEmployeePopupClose } from "../model/addEmployeePopupSlice";

interface IAddEmployeePopup {
  company: ICompany;
}

export function AddEmployeePopup({ company }: IAddEmployeePopup): ReactElement {
  const [inputValues, setInputValues] = useState({last_name: '', name: '', position: ''});
  const [ addEmployee ] = useAddEmployeeMutation();
  const dispatch = useAppDispatch();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValues((state) => ({...state, [e.target.name]: e.target.value}))
  }

  function handleAddEmployee(e: SyntheticEvent) {
    e.preventDefault();

    addEmployee({...company, employees: [...company.employees, inputValues]})
    .unwrap()
    .then((res) => {
      dispatch(recheckCompany(res));
      setInputValues({last_name: '', name: '', position: ''});
      dispatch(setIsEmployeePopupClose());
    })
    .catch((err) => console.log(err))
  }

  return (
    <Modal>
      <form className="flex flex-col bg-white px-6 py-4 rounded-[10px]">
        <p className="text-xl">Добавить сотрудника</p>
        <label className="text-lg mt-3">Фамилия</label>
        <input onChange={handleInputChange} value={inputValues.last_name} name="last_name" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <label className="text-lg mt-3">Имя</label>
        <input onChange={handleInputChange} value={inputValues.name} name="name" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <label className="text-lg mt-3">Должность</label>
        <input onChange={handleInputChange} value={inputValues.position} name="position" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <button onClick={handleAddEmployee} type="submit" className="bg-green-500 rounded-[10px] mt-2 py-2 text-white">Создать</button>
      </form>
    </Modal>
  )
}
