import { ReactElement } from "react";
import { useGetCompaniesQuery } from "@/shared/api/baseApi";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { setPaginationStart } from "@/features/CompaniesTable/model/scrollSlice";
import { CompaniesTable } from "@/features/CompaniesTable";

export function CompaniesTableBox(): ReactElement {
  const { limit } = useAppSelector((state) => state.scroll);
  const { data: companies = [], isLoading, isError } = useGetCompaniesQuery(limit);
  const dispatch = useAppDispatch();

  function handleFetchNextPage() {
    dispatch(setPaginationStart());
  }

  return (
    <div className="w-3/5 p-3 border-solid border-black border-2">
      {
        isError ? (
          <></>
        ) : (
          <CompaniesTable companies={companies} handleNext={handleFetchNextPage} isLoading={isLoading} />
        )
      }
    </div>
  )
}
