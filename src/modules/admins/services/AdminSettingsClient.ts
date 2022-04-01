import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminSettingsClient } from "../types";


@serviceClass(EServices.settings)
class AdminSettingsClient extends Service implements IAdminSettingsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getCities(): Promise<IJsonResponse> {
    return await this.http.get("/admin/settings/cities");
  }
}