import { IStoreService } from "@/services/types";
import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EUserType, IAccount, IAuthClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);

@serviceClass(EServices.auth)
class AuthClient extends Service implements IAuthClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @service(EServices.store)
  private store!: IStoreService;

  @throws("Failed to login")
  async login(email: string, password: string): Promise<IJsonResponse> {
    const response = await this.http.post(
      "/users/login",
      { email, password }
    );
    if (response.status == 200)
      this.store.instance.commit(
        "AccountModule/setAccount", 
        {
          ...response.data, 
          token: response.baseResponse!.headers.get("authorization")
        }
      );
    return response;
  }

  @throws("Failed to get permissions")
  async getAllPermissions(): Promise<IJsonResponse> {
    return await this.http.get("/admin/auth/permissions");
  }

  @throws("Failed to change user password")
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
