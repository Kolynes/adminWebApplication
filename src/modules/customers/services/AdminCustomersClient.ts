import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminCustomersClient } from "../types";

@serviceClass(EServices.adminCustomers)
export default class AdminCustomersClient extends Service implements IAdminCustomersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getCustomers(search: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/users/customers",
      { search, page, size: pageSize }
    );
  }

  async getCustomer(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/users/customers/${id}`);
  }

  async deleteCustomer(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/users/customers/${id}`);
  }

  async updateCustomer(
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string,
  ): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/customers/${id}`,
      {
        firstName,
        lastName,
        phoneNumber,
      }
    );
  }

  async createCustomer(
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
  ): Promise<IJsonResponse> {
    return await this.http.post(
      "/admin/users/customers",
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        gender,
        age,
        city,
        state,
        password
      }
    );
  }
}
