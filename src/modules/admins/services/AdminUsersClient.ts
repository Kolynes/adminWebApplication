import { IStoreService } from "@/services/types";
import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminUsersClient } from "../types";
@serviceClass(EServices.adminUsers)
class AdminUsersClient extends Service implements IAdminUsersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @service(EServices.store)
  private store!: IStoreService;

  async getUsers(search: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/users/adminusers",
      { search, page, size: pageSize }
    );
  }

  async getUser(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/users/${id}`);
  }

  async deleteUser(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/users/${id}`);
  }

  async updateUser(
    id: number, 
    firstName: string, 
    lastName: string, 
    email: string, 
    phoneNumber: string,
    roleType: string,
    permissions: number[]
  ): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/${id}`,
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        roleType,
        permissions
      }
    );
  }
  
  async disableUser(id: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/users/${id}/disable`);
  }

  async enableUser(id: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/users/${id}/enable`);
  }

  async createAdminUser(
    firstName: string, 
    lastName: string, 
    email: string, 
    phoneNumber: string, 
    password: string, 
    roleType: string, 
    permissions: number[]
  ): Promise<IJsonResponse> {
    return await this.http.post(
      "/admin/users/adminusers",
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        roleType,
        permissions
      }
    );
  }

  async getCurrent(): Promise<IJsonResponse> {
    const response = await this.http.get("/admin/users/current");
    if(response.status == 200)
      this.store.instance.commit("AdminModule/setAdmin", response.data);
    return response;
  }
}