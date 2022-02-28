import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminSettingsClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);

@serviceClass(EServices.settings)
class AdminSettingsClient extends Service implements IAdminSettingsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to get admin settings")
  async getCities(): Promise<IJsonResponse> {
    return await this.http.get("/admin/settings/cities");
  }
}