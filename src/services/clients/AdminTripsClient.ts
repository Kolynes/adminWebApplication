import EOrderTypes from "@/types/EOrderTypes";
import EServices from "@/types/EServices";
import JsonResponse from "@/utils/http/JsonResponse";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminTripClient } from ".";

@serviceClass(EServices.adminTrips)
class AdminTripsClient extends Service implements IAdminTripClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getTrips(status: EOrderTypes, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        "/admin/trips",
        {
          status,
          page,
          size: pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load trips")
      );
    }
  }

  async getTrip(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(`/admin/trips/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load trip")
      );
    }
  }

  async getTripsByAgent(id: number, page: number, pageSize: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        `/admin/trips/agents/${id}`,
        {
          page,
          pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load trip")
      );
    }
  }

  async getTripsByCustomer(id: number, page: number, pageSize: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        `/admin/trips/customers/${id}`,
        {
          page,
          pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load trip")
      );
    }
  }

  async getTripsByOrder(id: number, page: number, pageSize: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        `/admin/trips/orders/${id}`,
        {
          page,
          pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load trip")
      );
    }
  }

  async getTripsByOrganization(id: number, page: number, pageSize: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        `/admin/trips/organizations/${id}`,
        {
          page,
          pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load trip")
      );
    }
  }
  
}