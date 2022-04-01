import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { ETripStatus, IAdminTripsClient } from "../types";


@serviceClass(EServices.adminTrips)
class AdminTripsClient extends Service implements IAdminTripsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getTrips(status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/trips",
      { status, search, page, size: pageSize }
    );
  }

  async getTrip(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/trips/${id}`);
  }

  async deleteTrip(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/trips/${id}`)
  }

  async getTripsByAgent(id: number, status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      `/admin/trips/agents/${id}`,
      { status, search, page, pageSize }
    );
  }

  async getTripsByCustomer(id: number, status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      `/admin/trips/customers/${id}`,
      { status, search, page, pageSize }
    );
  }

  async getTripsByOrder(id: number, status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      `/admin/trips/orders/${id}`,
      { status, search, page, pageSize }
    );
  }

  async getTripsByOrganization(id: number, status: ETripStatus | "" = "", search: string = "", page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      `/admin/trips/organizations/${id}`,
      { status, search, page, pageSize }
    );
  }

}