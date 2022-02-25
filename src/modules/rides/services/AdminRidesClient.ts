import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminRidesClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);

@serviceClass(EServices.adminRides)
class AdminRidesClient extends Service implements IAdminRidesClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to get rides")
  async getRides(search: string, page: number, pageSize: number): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/rides",
      { search, page, pageSize }
    );
  }

  @throws("Failed to create ride")
  async createRide(
    name: string,
    model: string,
    brand: string,
    licensePlate: string,
    photo: File
  ): Promise<IJsonResponse> {
    return await this.http.post(
      "/admin/rides",
      { name, model, brand, licensePlate },
      { photo: [photo] }
    );
  }

  @throws("Failed to get ride")
  async getRide(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/rides/${id}`)
  }

  @throws("Failed to delete ride")
  async deleteRide(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/rides/${id}`)
  }

  @throws("Failed to update ride")
  async updateRide(
    id: number,
    name: string,
    brand: string,
    model: string,
    licensePlate: string
  ): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/rides/${id}`,
      { name, brand, model, licensePlate },
      undefined,
      EContentTypes.multipart
    );
  }

  @throws("Failed to change ride photo")
  async changeRidePhoto(id: number, image: File) {
    return await this.http.patch(
      `/admin/rides/${id}`,
      undefined,
      { image: [image] }
    );
  }
}
