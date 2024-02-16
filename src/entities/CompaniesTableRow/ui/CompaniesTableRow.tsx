import { ICompany } from "@/shared/model/types";
import { ReactElement, useState } from "react";

interface ICompaniesTableRow {
  data: ICompany;
}

export function CompaniesTableRow({ data }: ICompaniesTableRow): ReactElement {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className={`w-full border-solid border-black border-2 flex py-5 ${isSelected && "bg-blue-500"}`}>
      <label className="w-1/4 flex items-center justify-center cursor-pointer">
        <input type="checkbox" className="w-5 h-5 cursor-pointer" onChange={(e) => setIsSelected(e.target.checked)} />
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
