import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { IClicksClient } from "../types";

@serviceClass(EServices.clicks)
class ClicksClient extends Service implements IClicksClient {
  getClicksForPractitoners(query: string, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getClicksForPractitioner(id: number, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getClicksForOrganizations(query: string, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getClicksForOrganization(id: number, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getClicksForProducts(query: string, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getClicksByProduct(id: number, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
}