import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";

export interface IPaymentsClient extends Service {
  getPaymentsForProducts(
    query: string, 
    page?: number, 
    pageSize?: number
  ): Promise<IJsonResponse>;

  getPaymentsForProduct(
    id: number, 
    page?: number, 
    pageSize?: number
  ): Promise<IJsonResponse>;

  getPaymentForOrganizations(
    query: string, 
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getPaymentsForOrganization(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getPaymentsForPractitioners(
    query: string, 
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getPaymentsForPractitioner(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;
}