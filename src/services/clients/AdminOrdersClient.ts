import EOrderTypes from "@/types/EOrderTypes";
import EServices from "@/types/EServices";
import JsonResponse from "@/utils/http/JsonResponse";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IIndexableObject from "@/utils/types/IIndexableObject";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminOrdersClient } from ".";

@serviceClass(EServices.adminOrders)
class AdminOrdersClient extends Service implements IAdminOrdersClient {

  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getOrders(
    status: EOrderTypes | null, 
    query: string, 
    page: number = 1, 
    pageSize: number = 100
  ): Promise<IJsonResponse> {
    try {
      let payload: IIndexableObject = {
        query,
        page,
        size: pageSize,
      };
      if(status)
        payload = {
          ...payload,
          status
        } 
      return await this.http.get(
        "/admin/orders",
        payload
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load orders")
      );
    }
  }

  async getOrder(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(`/admin/orders/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load order")
      );
    }
  }

  async deleteOrder(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.delete(`/admin/orders/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to delete order")
      );
    }
  }

  async assignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse> {
    try {
      return await this.http.post(`/admin/orders/${orderId}/assign/${agentId}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to assign order")
      );
    }
  }

  async unassignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse> {
    try {
      return await this.http.delete(`/admin/orders/${orderId}/assign/${agentId}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to unassign order")
      );
    }
  }
}
