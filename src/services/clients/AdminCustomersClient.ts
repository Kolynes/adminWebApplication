import EServices from "@/types/EServices";
import JsonResponse from "@/utils/http/JsonResponse";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminCustomersClient } from ".";

@serviceClass(EServices.adminCustomers)
export default class AdminCustomersClient extends Service implements IAdminCustomersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getCustomers(query: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        "/admin/users/customers",
        {
          query,
          page,
          size: pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load customers")
      );
    }
  }

  async getCustomer(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(`/admin/users/customers/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load customer")
      );
    }
  }

  async deleteCustomer(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.delete(`/admin/users/customers/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to delete customer")
      );
    }
  }

  async updateCustomer(
    id: number, 
    firstName: string, 
    lastName: string, 
    email: string, 
    phoneNumber: string, 
    address: string,
    gender: string,
    age: string,
  ): Promise<IJsonResponse> {
    try {
      return await this.http.patch(
        `/admin/users/customers/${id}`,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          gender,
          age
        },
        undefined,
        EContentTypes.multipart
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to update customer")
      );
    }
  }

  async changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse> {
    try {
      return await this.http.patch(
        `/admin/users/customers/${id}`,
        {},
        {
          profilePhoto: [profilePhoto]
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to change agent profile photo")
      );
    }
  }

  async createCustomer(
    firstName: string, 
    lastName: string, 
    email: string, 
    phoneNumber: string, 
    profilePhoto: File,
    address: string,
    gender: string,
    age: string,
    password: string, 
  ): Promise<IJsonResponse> {
    try {
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
          password,
        },
        {
          profilePhoto: [profilePhoto]
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to create customer")
      );
    }
  }
}
