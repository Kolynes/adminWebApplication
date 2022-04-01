import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";

export interface IClicksClient extends Service {
  getClicksForPractitoners(
    query: string, 
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getClicksForPractitioner(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getClicksForOrganizations(
    query: string, 
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getClicksForOrganization(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getClicksForProducts(
    query: string, 
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getClicksByProduct(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;
}