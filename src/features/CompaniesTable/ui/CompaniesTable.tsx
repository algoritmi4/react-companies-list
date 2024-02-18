import { ReactElement } from "react";
import { TableHeader } from "@/entities/TableHeader";
import { Preloader } from "@/shared/ui/Preloader";
import { ICompany } from "@/shared/model/types";
import { CompaniesTableRow } from "@/entities/CompaniesTableRow";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { useDeleteCompanyMutation } from "../api/companiesApi";
import { resetPaginationPage } from "../model/scrollSlice";
import { uncheckAllCompanies } from "../model/checkedCompaniesSlice";
import { AddCompanyPopup } from "@/features/AddCompanyPopup/ui/AddCompanyPopup";
import { setIsCompanyPopupOpen } from "@/features/AddCompanyPopup/model/addCompanyPopupSlice";

interface ICompaniesTable {
  companies: ICompany[];
  handleNext: () => void;
  isLoading: boolean;
}

export function CompaniesTable({ companies, handleNext, isLoading }: ICompaniesTable): ReactElement {
  const rows = companies.map((company, index) => <CompaniesTableRow data={company} key={index} />);
  const dispatch = useAppDispatch();
  const { checkedCompanies } = useAppSelector((state) => state.checkedCompanies);
  const { isOpen } = useAppSelector((state) => state.addCompanyPopup);
  const [ deleteCompany ] = useDeleteCompanyMutation();
  const { isAllChecked } = useAppSelector((state) => state.checkedCompanies);

  function handleOpenModal() {
    dispatch(setIsCompanyPopupOpen());
  }

  // Forced multiple server requests because json-server does not support multiple delete
  function handleDeleteCompanies() {
    dispatch(uncheckAllCompanies());
    dispatch(resetPaginationPage());
    checkedCompanies.forEach((company) => {
      deleteCompany(company.id)
      .unwrap()
      .then(() => {})
      .catch((err) => console.log(err))
    })
  }

  return (
    <div className="w-3/5 flex flex-col p-2">
      {
        isOpen && <AddCompanyPopup />
      }
      <div className="flex self-end mr-4">
        <button onClick={handleOpenModal} type="button" className="px-3 py-1 bg-green-500 rounded-[10px] border-black border-2 border-solid">Добавить</button>
        <button onClick={handleDeleteCompanies} type="button" className={`px-3 py-1 rounded-[10px] ml-2 ${checkedCompanies.length === 0 ? "bg-gray-500" : "bg-red-500"}`} disabled={checkedCompanies.length === 0}>Удалить</button>
      </div>
      {
        isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Preloader />
          </div>
        ) : companies.length === 0 ? (
          <></>
        ) : (
          <InfiniteScroll
            dataLength={companies.length}
            // json-server do not support pagination great, i cant take a limit of data from response
            hasMore={companies.length < 100}
            next={handleNext}
            loader={<div className="self-center w-12"><Preloader /></div>}
            height={870}
            className="flex flex-col"
          >
            <TableHeader companies={companies} isAllChecked={isAllChecked} secondColumnText="Название компании" thirdColumnText="Кол-во сотрудников" fourthColumnText="Адрес" />
            {rows}
          </InfiniteScroll>
        )
      }
    </div>
  )
}
