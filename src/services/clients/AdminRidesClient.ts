import EServices from "@/types/EServices";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminRidesClient } from ".";

@serviceClass(EServices.adminRides)
class AdminRidesClient extends Service implements IAdminRidesClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getRides(
    query: string,
    page: number,
    pageSize: number
  ): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        "/admin/rides",
        {
          query,
          page,
          pageSize
        }
      );
    } catch (e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to get rides")
      );
    }
  }

  async createRide(
    name: string,
    model: string,
    brand: string,
    licensePlate: string,
    photo: File
  ): Promise<IJsonResponse> {
    try {
      return await this.http.post(
        "/admin/rides",
        {
          name,
          model,
          brand,
          licensePlate,
        },
        {
          photo: [photo]
        }
      );
    } catch (e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to create ride")
      );
    }
  }

  async getRide(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(`/admin/rides/${id}`)
    } catch (e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to get ride")
      );
    }
  }

  async deleteRide(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.delete(`/admin/rides/${id}`)
    } catch (e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to delete ride")
      );
    }
  }

  async updateRide(
    id: number,
    name: string,
    brand: string,
    model: string,
    licensePlate: string
  ): Promise<IJsonResponse> {
    try {
      return await this.http.patch(
        `/admin/rides/${id}`,
        {
          name,
          brand,
          model,
          licensePlate
        },
        {},
        EContentTypes.multipart
      )
    } catch (e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to update ride")
      );
    }
  }

  async changeRidePhoto(id: number, image: File) {
    try {
      return await this.http.patch(
        `/admin/rides/${id}`,
        {},
        {
          image: [image]
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to change agent profile photo")
      );
    }
  }
}
