import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminRidesClient } from "../types";


@serviceClass(EServices.adminRides)
class AdminRidesClient extends Service implements IAdminRidesClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getRides(search: string, page: number, pageSize: number): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/rides",
      { search, page, pageSize }
    );
  }

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

  async getRide(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/rides/${id}`)
  }

  async deleteRide(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/rides/${id}`)
  }

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

  async changeRidePhoto(id: number, image: File) {
    return await this.http.patch(
      `/admin/rides/${id}`,
      undefined,
      { image: [image] }
    );
  }
}
