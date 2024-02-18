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

  return (
    <div className={`w-full border-solid border-black border-2 flex py-5 ${isCompanyChecked && "bg-blue-500"}`}>
      <label className="w-1/4 flex items-center justify-center cursor-pointer">
        <input type="checkbox" id={`${data.id}`} className="w-5 h-5 cursor-pointer" onChange={handleCheckedState} checked={isCompanyChecked} />
      </label>
      <div className="w-1/4 overflow-hidden">
        <p className="text-lg truncate">{data.company}</p>
      </div>
      <div className="w-1/4 overflow-hidden">
        <p className="text-lg truncate">{data.employees.length}</p>
      </div>
      <div className="w-1/4 overflow-hidden">
        <p className="text-lg truncate">{data.address}</p>
      </div>
    </div>
  )
}
