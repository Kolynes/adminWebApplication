import EServices from "@/types/EServices";
import JsonResponse from "@/utils/http/JsonResponse";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminUsersClient } from "./clients";

@serviceClass(EServices.adminUsers)
class AdminUsersClient extends Service implements IAdminUsersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getUsers(query: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        "/admin/users",
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
        new JsonResponseErrors("Failed to load users")
      );
    }
  }

  async getUser(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(`/admin/users/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load user")
      );
    }
  }

  async deleteUser(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.delete(`/admin/users/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to delete users")
      );
    }
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
    try {
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
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to update users")
      );
    }
  }

  async disableUser(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.post(`/admin/users/${id}/disable`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to disable users")
      );
    }
  }

  async enableUser(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.post(`/admin/users/${id}/enable`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to enable users")
      );
    }
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
    try {
      return await this.http.post(
        "/admin/users/adminuser",
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
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to create admin user")
      );
    }
  }

  async getCurrentAdmin(): Promise<IJsonResponse> {
    try {
      return await this.http.post("/admin/users/current");
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to enable users")
      );
    }
  }

}