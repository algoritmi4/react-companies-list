import { useGetCompaniesQuery } from "@/shared/api/baseApi";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { setPaginationLimit } from "@/features/CompaniesTable/model/scrollSlice";
import { CompaniesTable } from "@/features/CompaniesTable";

export function App() {
  const { limit } = useAppSelector((state) => state.scroll);
  const { data: companies = [], isLoading, isError } = useGetCompaniesQuery(limit);
  const dispatch = useAppDispatch();

  function handleFetchNextPage() {
    dispatch(setPaginationLimit());
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
