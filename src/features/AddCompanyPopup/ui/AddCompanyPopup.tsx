import { useAddCompanyMutation } from "@/features/CompaniesTable/api/companiesApi";
import { useAppDispatch } from "@/shared/model/hooks";
import { Modal } from "@/shared/ui/Modal";
import { ChangeEvent, ReactElement, SyntheticEvent, useState } from "react";
import { setIsCompanyPopupClose } from "../model/addCompanyPopupSlice";
import { resetPaginationPage } from "@/features/CompaniesTable/model/scrollSlice";

export function AddCompanyPopup(): ReactElement {
  const [inputValues, setInputValues] = useState({company: '', address: ''});
  const [ addCompany ] = useAddCompanyMutation();
  const dispatch = useAppDispatch();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValues((state) => ({...state, [e.target.name]: e.target.value}))
  }

  function handleAddCompany(e: SyntheticEvent) {
    e.preventDefault();

    addCompany(inputValues)
    .unwrap()
    .then(() => {
      dispatch(resetPaginationPage());
      dispatch(setIsCompanyPopupClose());
      setInputValues({company: '', address: ''});
    })
    .catch((err) => console.log(err))
  }

  return (
    <Modal>
      <form className="flex flex-col bg-white px-6 py-4 rounded-[10px]">
        <p className="text-xl">Создать компанию</p>
        <label className="text-lg mt-3">Название</label>
        <input onChange={handleInputChange} value={inputValues.company} name="company" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <label className="text-lg mt-3">Адрес</label>
        <input onChange={handleInputChange} value={inputValues.address} name="address" type="text" className="outline-none border-[1px] border-black rounded-[5px] px-2 py-1"/>
        <button onClick={handleAddCompany} type="submit" className="bg-green-500 rounded-[10px] mt-2 py-2 text-white">Создать</button>
      </form>
    </Modal>
  )
}
