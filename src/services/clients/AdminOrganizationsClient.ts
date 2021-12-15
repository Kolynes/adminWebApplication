import EOrganizationTypes from "@/types/EOrganizationTypes";
import EServices from "@/types/EServices";
import JsonResponse from "@/utils/http/JsonResponse";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminOrganizationsClient } from ".";

@serviceClass(EServices.adminOrganizations)
class AdminOrganizationsClient extends Service implements IAdminOrganizationsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getOrganizations(type: EOrganizationTypes, query: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        "/admin/users/organizations",
        {
          type,
          query,
          page,
          size: pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load organizations")
      );
    }
  }

  async getOrganization(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(`/admin/users/organizations/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load organization")
      );
    }
  }

  async deleteOrganization(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.delete(`/admin/users/organizations/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to delete organization")
      );
    }
  }

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
    try {
      return await this.http.patch(
        `/admin/users/organizations/${id}`,
        {
          name,
          email,
          description,
          address,
          phoneNumber,
          latitude,
          longitude,
        },
        {},
        EContentTypes.multipart
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to update organization")
      );
    }
  }

  async changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse> {
    try {
      return await this.http.patch(
        `/admin/users/organizations/${id}`,
        {},
        {
          profilePhoto: [profilePhoto]
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
    try {
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
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to create organization")
      );
    }
  }
}
