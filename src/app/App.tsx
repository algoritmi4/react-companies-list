import { useGetCompaniesQuery } from "@/shared/api/baseApi";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { setPaginationPage } from "@/features/CompaniesTable/model/scrollSlice";
import { CompaniesTable } from "@/features/CompaniesTable";
import { EmployeesTable } from "@/features/EmployeesTable";

export function App() {
  const { page } = useAppSelector((state) => state.scroll);
  const { checkedCompanies, isAllChecked } = useAppSelector((state) => state.checkedCompanies);
  const { data: companies = [], isLoading, isError } = useGetCompaniesQuery(page);
  const dispatch = useAppDispatch();

  function handleFetchNextPage() {
    dispatch(setPaginationPage());
  }

  return (
    <main className="w-screen h-screen flex">
      {
        isError ? (
          <></>
        ) : (
          <CompaniesTable companies={companies} handleNext={handleFetchNextPage} isLoading={isLoading} />
        )
      }
      {
        checkedCompanies.length > 0 && !isAllChecked ? (
          <EmployeesTable company={checkedCompanies[checkedCompanies.length - 1]} />
        ) : (
          <></>
        )
      }
    </main>
  )
}
