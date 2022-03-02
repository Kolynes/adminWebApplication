import { IStoreService } from "@/services/types";
import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IOrganizationsClient } from "../types";

@serviceClass(EServices.organizations)
class OrganizationsClient extends Service implements IOrganizationsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @service(EServices.store)
  private store!: IStoreService;
  
  async getCurrent(): Promise<IJsonResponse> {
    const response = await this.http.get("/organizations/current");
    if(response.status == 200)
      this.store.instance.commit("OrganizationModule/setOrganization", response.data);
    return response;
  }

  getOrders(): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }

  getProducts(): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }

  createProduct(): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }

  updateProduct(): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }

  getDashboard(): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  
  updateOrganization(): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  
}