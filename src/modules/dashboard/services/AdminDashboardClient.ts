import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminDashboardClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse)

@serviceClass(EServices.adminDashboard)
class AdminDashboardClient extends Service implements IAdminDashboardClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to get dashboard details")
  async getDashboard(): Promise<IJsonResponse> {
    return await this.http.get("/admin/dashboard");
  }
}