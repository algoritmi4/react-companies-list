import { useAddCompanyMutation, useUpdateCompanyMutation } from "@/features/CompaniesTable/api/companiesApi";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { Modal } from "@/shared/ui/Modal";
import { ChangeEvent, ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { setIsCompanyPopupClose } from "../model/addCompanyPopupSlice";
import { resetPaginationPage } from "@/features/CompaniesTable/model/scrollSlice";

export function AddCompanyPopup(): ReactElement {
  const [inputValues, setInputValues] = useState({company: '', address: ''});
  const { values, isEdit, companyId } = useAppSelector((state) => state.addCompanyPopup);
  const [ addCompany ] = useAddCompanyMutation();
  const [ updateCompany ] = useUpdateCompanyMutation();
  const dispatch = useAppDispatch();

  const isButtonDisabled = inputValues.company === values.company && inputValues.address === values.address;

  useEffect(() => {
    setInputValues({company: values.company, address: values.address});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValues((state) => ({...state, [e.target.name]: e.target.value}));
  }

  function onButtonClick(e: SyntheticEvent) {
    e.preventDefault();

    isEdit ? handleEditCompany() : handleAddCompany();
  }

  function handleEditCompany() {
    updateCompany({...inputValues, id: companyId})
    .unwrap()
    .then(() => {
      dispatch(resetPaginationPage());
      dispatch(setIsCompanyPopupClose());
    })
    .catch((err) => console.log(err))
  }

  function handleAddCompany() {
    addCompany(inputValues)
    .unwrap()
    .then(() => {
      dispatch(resetPaginationPage());
      dispatch(setIsCompanyPopupClose());
    })
    .catch((err) => console.log(err))
  }

  return (
    <Modal>
      <form className="flex flex-col bg-white px-6 py-4 rounded-[10px]">
        <p className="text-xl">{isEdit ? "Редактировать" : "Создать компанию"}</p>
        <label className="text-lg mt-3">Название</label>
        <input onChange={handleInputChange} value={inputValues.company} name="company" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <label className="text-lg mt-3">Адрес</label>
        <input onChange={handleInputChange} value={inputValues.address} name="address" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <button onClick={onButtonClick} type="submit" className={` rounded-[10px] mt-2 py-2 text-white ${isButtonDisabled ? "bg-gray-500" : "bg-green-500"}`} disabled={isButtonDisabled}>{isEdit ? "Готово" : "Создать"}</button>
      </form>
    </Modal>
  )
}
