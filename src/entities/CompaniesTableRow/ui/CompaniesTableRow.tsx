import { setIsCompanyPopupOpen } from "@/features/AddCompanyPopup/model/addCompanyPopupSlice";
import { checkCompany, uncheckCompany } from "@/features/CompaniesTable/model/checkedCompaniesSlice";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { ICompany } from "@/shared/model/types";
import { ChangeEvent, ReactElement } from "react";

interface ICompaniesTableRow {
  data: ICompany;
}

export function CompaniesTableRow({ data }: ICompaniesTableRow): ReactElement {
  const { checkedCompanies } = useAppSelector((state) => state.checkedCompanies);
  const dispatch = useAppDispatch();

  const isCompanyChecked = checkedCompanies.some((el) => el.id === data.id);

  function handleCheckedState(e: ChangeEvent<HTMLInputElement>) {
    e.target.checked
    ? dispatch(checkCompany(data))
    : dispatch(uncheckCompany(data.id))
  }

  function handleOpenEditPopup() {
    dispatch(setIsCompanyPopupOpen({values: data, isEdit: true}))
  }

  return (
    <div className={`w-full border-x-solid border-x-1 border-b-1 border-b-solid flex py-5 ${isCompanyChecked && "bg-blue-500"}`}>
      <label className="w-1/5 flex items-center justify-center cursor-pointer px-1">
        <input type="checkbox" id={`${data.id}`} className="w-5 h-5 cursor-pointer" onChange={handleCheckedState} checked={isCompanyChecked} />
      </label>
      <div className="w-1/5 overflow-hidden px-1">
        <p className="text-lg truncate">{data.company}</p>
      </div>
      <div className="w-1/5 overflow-hidden px-1">
        <p className="text-lg truncate">{data.employees.length}</p>
      </div>
      <div className="w-1/5 overflow-hidden px-1">
        <p className="text-lg truncate">{data.address}</p>
      </div>
      <div className="w-1/5 flex items-center justify-center">
        <div onClick={handleOpenEditPopup} className="bg-edit-icon w-8 h-8 cursor-pointer"></div>
      </div>
    </div>
  )
}
