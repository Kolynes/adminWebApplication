import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { ETripStatus, IAdminTripsClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);

@serviceClass(EServices.adminTrips)
class AdminTripsClient extends Service implements IAdminTripsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to load trips")
  async getTrips(status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/trips",
      { status, search, page, size: pageSize }
    );
  }

  @throws("Failed to load trip")
  async getTrip(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/trips/${id}`);
  }

  @throws("Failed to delete trip")
  async deleteTrip(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/trips/${id}`)
  }

  @throws("Failed to load trip")
  async getTripsByAgent(id: number, status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      `/admin/trips/agents/${id}`,
      { status, search, page, pageSize }
    );
  }

  @throws("Failed to load trip")
  async getTripsByCustomer(id: number, status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      `/admin/trips/customers/${id}`,
      { status, search, page, pageSize }
    );
  }

  @throws("Failed to load trip")
  async getTripsByOrder(id: number, status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      `/admin/trips/orders/${id}`,
      { status, search, page, pageSize }
    );
  }

  @throws("Failed to load trip")
  async getTripsByOrganization(id: number, status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      `/admin/trips/organizations/${id}`,
      { status, search, page, pageSize }
    );
  }

}