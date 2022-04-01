import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IIndexableObject from "@/utils/types/IIndexable";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EOrderTypes, IAdminOrdersClient } from "../types";

@serviceClass(EServices.adminOrders)
class AdminOrdersClient extends Service implements IAdminOrdersClient {

  @service(EServices.http)
  private http!: IJsonResponseClient;

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

  async getOrder(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/orders/${id}`);
  }

  async deleteOrder(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/orders/${id}`);
  }

  async assignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse> {
    return await this.http.post(`/admin/orders/${orderId}/assign/${agentId}`);
  }

  async unassignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/orders/${orderId}/assign/${agentId}`);
  }
}
