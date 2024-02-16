interface IEmployees {
  id: string;
  name: string;
  last_name: string;
  position: string;
}

export interface ICompany {
  company: string;
  address: string;
  id: string;
  employees: IEmployees[];
}
