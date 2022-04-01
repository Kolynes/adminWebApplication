import { IStoreService } from "@/services/types";
import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAuthClient } from "../types";


@serviceClass(EServices.auth)
class AuthClient extends Service implements IAuthClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @service(EServices.store)
  private store!: IStoreService;

  async login(email: string, password: string): Promise<IJsonResponse> {
    const response = await this.http.post(
      "/users/login",
      { email, password }
    );
    this.store.instance.commit(
      "AccountModule/setAccount", 
      {
        ...response.data, 
        token: response.baseResponse!.headers.get("authorization")
      }
    );
    return response;
  }

  async getAllPermissions(): Promise<IJsonResponse> {
    return await this.http.get("/admin/auth/permissions");
  }

  async changeUserPassword(id: number, newPassword: string): Promise<IJsonResponse> {
    return await this.http.post(
      `/admin/auth/changepassword/${id}`,
      { newPassword }
    );
  }

  async logout(): Promise<boolean> {
    this.store.instance.commit("AccountModule/clear")
    return true;
  }
}
