import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminCustomersClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);

@serviceClass(EServices.adminCustomers)
export default class AdminCustomersClient extends Service implements IAdminCustomersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to get customers")
  async getCustomers(search: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/users/customers",
      { search, page, size: pageSize }
    );
  }

  @throws("Failed to get customer")
  async getCustomer(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/users/customers/${id}`);
  }

  @throws("Failed to delete customer")
  async deleteCustomer(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/users/customers/${id}`);
  }

  @throws("Failed to update customer")
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

  @throws("Failed to create customer")
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
