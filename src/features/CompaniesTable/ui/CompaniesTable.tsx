import { ReactElement } from "react";
import { TableHeader } from "@/entities/TableHeader";
import { Preloader } from "@/shared/ui/Preloader";
import { ICompany } from "@/shared/model/types";
import { CompaniesTableRow } from "@/entities/CompaniesTableRow";
import InfiniteScroll from "react-infinite-scroll-component";

interface ICompaniesTable {
  companies: ICompany[];
  handleNext: () => void;
  isLoading: boolean;
}

export function CompaniesTable({ companies, handleNext, isLoading }: ICompaniesTable): ReactElement {
  const rows = companies.map((company, index) => <CompaniesTableRow data={company} key={index} />);

  return (
    <>
      {
        isLoading ? (
          <Preloader />
        ) : companies.length === 0 ? (
          <></>
        ) : (
          <InfiniteScroll
            dataLength={companies.length}
            hasMore={companies.length < 31}
            next={handleNext}
            loader={<Preloader />}
            height={900}
          >
            <TableHeader secondColumnText="Название компании" thirdColumnText="Кол-во сотрудников" fourthColumnText="Адрес" />
            {rows}
          </InfiniteScroll>
        )
      }
    </>
  )
}
