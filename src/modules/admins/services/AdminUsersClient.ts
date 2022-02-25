import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminUsersClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);

@serviceClass(EServices.adminUsers)
class AdminUsersClient extends Service implements IAdminUsersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to get users")
  async getUsers(search: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/users/adminusers",
      { search, page, size: pageSize }
    );
  }

  @throws("Failed to get user")
  async getUser(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/users/${id}`);
  }

  @throws("Failed to delete user")
  async deleteUser(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/users/${id}`);
  }

  @throws("Failed to update user")
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
  
  @throws("Failed to disable users")
  async disableUser(id: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/users/${id}/disable`);
  }

  @throws("Failed to enable user")
  async enableUser(id: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/users/${id}/enable`);
  }

  @throws("Failed to create admin user")
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

  @throws("Failed to get current admin")
  async getCurrentAdmin(): Promise<IJsonResponse> {
    return await this.http.post("/admin/users/current");
  }
}