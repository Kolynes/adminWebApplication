import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminDashboardClient } from "../types";

@serviceClass(EServices.adminDashboard)
class AdminDashboardClient extends Service implements IAdminDashboardClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getDashboard(): Promise<IJsonResponse> {
    return await this.http.get("/admin/dashboard");
  }
}