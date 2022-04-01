import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EOrganizationTypes, IAdminOrganizationsClient } from "../types";


@serviceClass(EServices.adminOrganizations)
class AdminOrganizationsClient extends Service implements IAdminOrganizationsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getOrganizations(
    type: EOrganizationTypes, 
    search: string, 
    page: number = 1, 
    pageSize: number = 100
  ): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/users/organizations",
      { type, search, page, size: pageSize }
    );
  }

  async getOrganization(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/users/organizations/${id}`);
  }

  async deleteOrganization(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/users/organizations/${id}`);
  }

  async updateOrganization(
    id: number,
    name: string,
    email: string,
    description: string,
    address: string,
    city: string,
    phoneNumber: string,
    latitude: number,
    longitude: number,
  ): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/organizations/${id}`,
      { name, email, description, address, city, phoneNumber, latitude, longitude },
      undefined,
      EContentTypes.multipart
    );
  }

  async changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/organizations/${id}`,
      undefined,
      { profilePhoto: [profilePhoto] }
    );
  }

  async createOrganization(
    name: string,
    email: string,
    description: string,
    address: string,
    city: string,
    phoneNumber: string,
    profilePhoto: File,
    latitude: number,
    longitude: number,
    organizationType: EOrganizationTypes,
    password: string 
  ): Promise<IJsonResponse> {
    return await this.http.post(
      "/admin/users/organizations",
      {
        name,
        email,
        description,
        address,
        city,
        phoneNumber,
        latitude,
        longitude,
        organizationType,
        password 
      },
      {
        profilePhoto: [profilePhoto]
      }
    );
  }
}
