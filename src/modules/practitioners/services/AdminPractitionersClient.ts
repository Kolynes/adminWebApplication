import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EIdentificationTypes, EPractitionerTypes, EVerificationTypes, IAdminPractitionersClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);  

@serviceClass(EServices.adminPractitioners)
class AdminPractitionersClient extends Service implements IAdminPractitionersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to load practitioners")
  async getPractitioners(type: EPractitionerTypes, search: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/users/practitioners",
      { type, search, page, size: pageSize }
    );
  }

  @throws("Failed to load practitioner")
  async getPractitioner(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/users/practitioners/${id}`);
  }

  @throws("Failed to delete practitioner")
  async deletePractitioner(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/users/practitioners/${id}`);
  }

  @throws("Failed to create practitioner")
  async createPractitioner(
    name: string,
    email: string,
    phoneNumber: string,
    description: string,
    specialties: string,
    yearsOfExperience: number,
    companyName: string,
    address: string,
    city: string,
    latitude: number,
    longitude: number,
    practitionerType: EPractitionerTypes,
    identificationType: EIdentificationTypes,
    verificationType: EVerificationTypes,
    identificationPhoto: File,
    verificationPhoto: File,
    profilePhoto: File,
    password: string
  ): Promise<IJsonResponse> {
    return await this.http.post(
      "/admin/users/practitioners",
      {
        name, 
        email,
        phoneNumber, 
        description, 
        specialties, 
        yearsOfExperience, 
        companyName,
        address,
        city,
        latitude,
        longitude,
        practitionerType,
        identificationType,
        verificationType,
        password
      },
      {
        identificationPhoto: [identificationPhoto],
        verificationPhoto: [verificationPhoto],
        profilePhoto: [profilePhoto]
      }
    );
  }

  @throws("Failed to update practitioner")
  async updatePractitioner(
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    description: string,
    specialties: string,
    yearsOfExperience: number,
    companyName: string,
    address: string,
    city: string,
    latitude: number,
    longitude: number
  ): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/practitioners/${id}`,
      {
        name, 
        email,
        phoneNumber, 
        description, 
        specialties, 
        yearsOfExperience, 
        companyName,
        address,
        city,
        latitude,
        longitude
      },
      undefined,
      EContentTypes.multipart
    );
  }

  @throws("Failed to change profile picture")
  async changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/practitioners/${id}`,
      undefined,
      {
        profilePhoto: [profilePhoto]
      }
    );
  }

  @throws("Failed to verify practitioner")
  async verifyPractitioner(id: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/users/practitoners/verify/${id}`);
  }

  @throws("Failed to complete practitioner identification")
  async completeIdentifcation(id: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/users/practitoners/identify/${id}`);
  }
}
