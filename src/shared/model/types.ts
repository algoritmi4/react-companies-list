export interface IEmployees {
  id: number;
  name: string;
  last_name: string;
  position: string;
}

export interface ICompany {
  company: string;
  address: string;
  id: number;
  employees: IEmployees[];
}
