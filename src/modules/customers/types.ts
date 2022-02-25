import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";

export interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  age: string;
  address: string;
  lga: string;
  phoneNumber: string;
  profilePicture: string;
  state: string;
  token: string;
};

export interface IAdminCustomersClient extends Service {
  getCustomers(
    search: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getCustomer(id: number): Promise<IJsonResponse>;

  deleteCustomer(id: number): Promise<IJsonResponse>;

  createCustomer(
    firstName: string, 
    lastName: string, 
    email: string, 
    phoneNumber: string, 
    address: string,
    gender: string,
    age: string,
    city: string,
    state: string,
    password: string, 
  ): Promise<IJsonResponse>;

  updateCustomer(
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string, 
  ): Promise<IJsonResponse>;
}

export interface ICustomerEditor {
  toggleCreateCustomerDialog(): void;
  beginEditCustomer(customer: ICustomer): void;
}