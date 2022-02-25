import { IStoreService } from "@/services/types";
import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EIdentificationTypes, EPractitionerTypes, ESubscriptionTypes, EVerificationTypes, IPractitonersClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);

@serviceClass(EServices.practitioners)
class PractitionersClient extends Service implements IPractitonersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @service(EServices.store)
  private store!: IStoreService;

  @throws("Failed to sign up")
  async signUp(
    name: string,
    email: string,
    phoneNumber: string,
    description: string,
    specialties: string,
    yearsOfExperience: number,
    companyName: string,
    address: string,
    city: string,
    latitude: string,
    longitiude: string,
    practitionerType: EPractitionerTypes,
    identificationType: EIdentificationTypes,
    verificationType: EVerificationTypes,
    identificationPhoto: File,
    verificationPhoto: File,
    profilePhoto: File,
    password: string
  ): Promise<IJsonResponse> {
    const response = await this.http.post(
      "/practitioners/signup",
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
        longitiude,
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
    if(response.status == 200)
      this.store.instance.commit("PractitionerModule/setPractitioner", response.data);
    return response;
  }

  async login(email: string, password: string): Promise<IJsonResponse> {
    const response = await this.http.post(
      "/practitioners/login",
      { email, password }
    );
    if(response.status == 200)
      this.store.instance.commit("PractitionerModule/setPractitioner", response.data);
    return response;
  }

  async subscribe(id: number, transactionReference: string, subscriptionType: ESubscriptionTypes): Promise<IJsonResponse> {
    const response = await this.http.post(
      `/practitioners/${id}/subscriptions/subscribe`,
      { transactionReference, subscriptionType }
    );
    if(response.status == 200)
      this.store.instance.commit("PractitionerModule/setSubsription", response.data);
    return response;
  }

  async unsubscribe(id: number): Promise<IJsonResponse> {
    const response = await this.http.post(
      `/practitioners/${id}/subscriptions/subscribe`
    );
    if(response.status == 200)
      this.store.instance.commit("PractitionerModule/clearSubscription");
    return response;
  }

  async deleteAccount(id: number): Promise<IJsonResponse> {
    const response = await this.http.delete(`/practitioners/${id}`);
    if(response.status == 200)
      this.logout();
    return response;
  }

  async logout(): Promise<boolean> {
    this.store.instance.commit("PractitionerModule/clear")
    return true;
  }

}