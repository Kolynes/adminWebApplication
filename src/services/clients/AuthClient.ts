import EServices from "@/types/EServices";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IStoreService } from "../services";
import { IAuthClient } from ".";

@serviceClass(EServices.auth)
class AuthClient extends Service implements IAuthClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;
  
  @service(EServices.store)
  private store!: IStoreService;

  async login(email: string, password: string): Promise<IJsonResponse> {
    try {
      const response = await this.http.post(
        "/admin/auth/login",
        { email, password }
      );
      if(response.status == 200)
        this.store.instance.commit("AdminModule/setAdmin", response.data);
      return response;
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to login")
      );
    }
  }

  async getAllPermissions(): Promise<IJsonResponse> {
    try {
      return await this.http.get("/admin/auth/permissions");
    } catch(e) {
      console.log(e)
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to get all permissions")
      );
    }
  }

  async changeUserPassword(id: number, newPassword: string): Promise<IJsonResponse> {
    try {
      return await this.http.post(
        `/admin/auth/changepassword/${id}`,
        { newPassword }
      );
    } catch(e) {
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to change user password")
      );
    }
  }

  async logout(): Promise<boolean> {
    try {
      this.store.instance.commit("AdminModule/clear")
      return true;
    } catch(e) {
      return false;
    }
  }
}
