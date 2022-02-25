import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IIndexableObject from "@/utils/types/IIndexableObject";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EOrderTypes, IAdminOrdersClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);

@serviceClass(EServices.adminOrders)
class AdminOrdersClient extends Service implements IAdminOrdersClient {

  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to load orders")
  async getOrders(
    status: EOrderTypes | null,
    search: string,
    page: number = 1,
    pageSize: number = 100
  ): Promise<IJsonResponse> {
    let payload: IIndexableObject = {
      search,
      page,
      size: pageSize,
    };
    if (status)
      payload = {
        ...payload,
        status
      }
    return await this.http.get(
      "/admin/orders",
      payload
    );
  }

  @throws("Failed to load order")
  async getOrder(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/orders/${id}`);
  }

  @throws("Failed to delete order")
  async deleteOrder(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/orders/${id}`);
  }

  @throws("Failed to assign order")
  async assignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/orders/${orderId}/assign/${agentId}`);
  }

  @throws("Failed to unassign order")
  async unassignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/orders/${orderId}/assign/${agentId}`);
  }
}
