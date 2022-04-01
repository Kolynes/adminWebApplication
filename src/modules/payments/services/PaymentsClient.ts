import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { IPaymentsClient } from "../types";

@serviceClass(EServices.payments)
class PaymentsClient extends Service implements IPaymentsClient {
  getPaymentsForProducts(query: string, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getPaymentsForProduct(id: number, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getPaymentForOrganizations(query: string, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getPaymentsForOrganization(id: number, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getPaymentsForPractitioners(query: string, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
  getPaymentsForPractitioner(id: number, page?: number, pageSize?: number): Promise<IJsonResponse> {
    throw new Error("Method not implemented.");
  }
}