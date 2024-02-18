import { recheckCompany } from "@/features/CompaniesTable/model/checkedCompaniesSlice";
import { useAddEmployeeMutation, useUpdateEmployeeMutation } from "@/features/EmployeesTable/api/employeesApi";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { ICompany } from "@/shared/model/types";
import { Modal } from "@/shared/ui/Modal";
import { ChangeEvent, ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { setIsEmployeePopupClose } from "../model/addEmployeePopupSlice";

interface IAddEmployeePopup {
  company: ICompany;
}

export function AddEmployeePopup({ company }: IAddEmployeePopup): ReactElement {
  const [inputValues, setInputValues] = useState({last_name: '', name: '', position: ''});
  const [ addEmployee ] = useAddEmployeeMutation();
  const [ updateEmployee ] = useUpdateEmployeeMutation();
  const { values, isEdit } = useAppSelector((state) => state.addEmployeePopup)
  const dispatch = useAppDispatch();

  const isButtonDisabled = inputValues.last_name === values.last_name && inputValues.name === values.name && inputValues.position === values.position;

  useEffect(() => {
    setInputValues({last_name: values.last_name, name: values.name, position: values.position});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValues((state) => ({...state, [e.target.name]: e.target.value}))
  }

  function onButtonClick(e: SyntheticEvent) {
    e.preventDefault();

    isEdit ? handleUpdateEmployee() : handleAddEmployee();
  }

  function handleAddEmployee() {
    addEmployee({...company, employees: [...company.employees, {...inputValues, id: company.employees.length + 1}]})
    .unwrap()
    .then((res) => {
      dispatch(recheckCompany(res));
      dispatch(setIsEmployeePopupClose());
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateEmployee() {
    const anotherEmployees = company.employees.filter((el) => el.id !== values.id);

    updateEmployee({...company, employees: [...anotherEmployees, {...inputValues, id: company.employees.length}]})
    .unwrap()
    .then((res) => {
      dispatch(recheckCompany(res));
      dispatch(setIsEmployeePopupClose());
    })
    .catch((err) => console.log(err))
  }

  return (
    <Modal>
      <form className="flex flex-col bg-white px-6 py-4 rounded-[10px]">
        <p className="text-xl">{isEdit ? "Редактировать" : "Добавить сотрудника"}</p>
        <label className="text-lg mt-3">Фамилия</label>
        <input onChange={handleInputChange} value={inputValues.last_name} name="last_name" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <label className="text-lg mt-3">Имя</label>
        <input onChange={handleInputChange} value={inputValues.name} name="name" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <label className="text-lg mt-3">Должность</label>
        <input onChange={handleInputChange} value={inputValues.position} name="position" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <button onClick={onButtonClick} type="submit" className={`rounded-[10px] mt-2 py-2 text-white ${isButtonDisabled ? "bg-gray-500" : "bg-green-500"}`} disabled={isButtonDisabled}>{isEdit ? "Готово" : "Создать"}</button>
      </form>
    </Modal>
  )
}
