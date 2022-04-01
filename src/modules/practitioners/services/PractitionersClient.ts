import { IStoreService } from "@/services/types";
import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EIdentificationTypes, EPractitionerTypes, ESubscriptionTypes, EVerificationTypes, IPractitonersClient } from "../types";


@serviceClass(EServices.practitioners)
class PractitionersClient extends Service implements IPractitonersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @service(EServices.store)
  private store!: IStoreService;

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

  async getCurrent(): Promise<IJsonResponse> {
    const response = await this.http.get("/practitioners/current");
    if(response.status == 200) {
      this.store.instance.commit("PractitionerModule/setPractitioner", response.data);
      this.store.instance.commit("AccountModule/setUserSubType", response.data.practitionerType2);
    }
    return response;
  }

  async logout(): Promise<boolean> {
    this.store.instance.commit("PractitionerModule/clear")
    return true;
  }

}