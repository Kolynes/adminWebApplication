import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EIdentificationTypes, EPractitionerTypes, EVerificationTypes, IAdminPractitionersClient } from "../types";


@serviceClass(EServices.adminPractitioners)
class AdminPractitionersClient extends Service implements IAdminPractitionersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getPractitioners(type: EPractitionerTypes, search: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/users/practitioners",
      { type, search, page, size: pageSize }
    );
  }

  async getPractitioner(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/users/practitioners/${id}`);
  }

  async deletePractitioner(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/users/practitioners/${id}`);
  }

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

  async changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/practitioners/${id}`,
      undefined,
      {
        profilePhoto: [profilePhoto]
      }
    );
  }

  async verifyPractitioner(id: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/users/practitoners/verify/${id}`);
  }

  async completeIdentifcation(id: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/users/practitoners/identify/${id}`);
  }

  getPayments(
    query: string, 
    page?: number, 
    pageSize?: number
  ): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }

  getPaymentsByPractitioner(
    id: number, 
    page?: number, 
    pageSize?: number
  ): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }

  getClicks(
    query: string, 
    page?: number, 
    pageSize?: number
  ): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }

  getClicksByPractitioner(
    id: number, 
    page?: number, 
    pageSize?: number
  ): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
}
