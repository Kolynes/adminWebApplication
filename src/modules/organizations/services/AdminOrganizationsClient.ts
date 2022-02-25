import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EOrganizationTypes, IAdminOrganizationsClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);

@serviceClass(EServices.adminOrganizations)
class AdminOrganizationsClient extends Service implements IAdminOrganizationsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to get organizations")
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

  @throws("Failed to get organization")
  async getOrganization(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/users/organizations/${id}`);
  }

  @throws("Failed to delete organization")
  async deleteOrganization(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/users/organizations/${id}`);
  }

  @throws("Failed to update organization")
  async updateOrganization(
    id: number,
    name: string,
    email: string,
    description: string,
    address: string,
    phoneNumber: string,
    latitude: number,
    longitude: number,
  ): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/organizations/${id}`,
      { name, email, description, address, phoneNumber, latitude, longitude },
      undefined,
      EContentTypes.multipart
    );
  }

  @throws("Failed to change organization profile picture")
  async changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/organizations/${id}`,
      undefined,
      { profilePhoto: [profilePhoto] }
    );
  }

  @throws("Failed to create organization")
  async createOrganization(
    name: string,
    email: string,
    description: string,
    address: string,
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
