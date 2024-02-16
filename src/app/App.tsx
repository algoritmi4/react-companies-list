import { useGetCompaniesQuery } from "@/shared/api/baseApi";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { setPaginationStart } from "@/features/CompaniesTable/model/scrollSlice";
import { CompaniesTable } from "@/features/CompaniesTable";

export function App() {
  const { start } = useAppSelector((state) => state.scroll);
  const { data: companies = [], isLoading, isError } = useGetCompaniesQuery(start);
  const dispatch = useAppDispatch();

  function handleFetchNextPage() {
    dispatch(setPaginationStart());
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
    </main>
  )
}
