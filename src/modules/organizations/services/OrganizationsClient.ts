import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { IOrganizationsClient } from "../types";

@serviceClass(EServices.organizations)
class OrganizationsClient extends Service implements IOrganizationsClient {
  getCurrent(): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
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