import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminAgentsClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse)

@serviceClass(EServices.adminAgent)
export default class AdminAgentsClient extends Service implements IAdminAgentsClient {

  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to get agents")
  async getAgents(search: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/admin/users/agents",
      { search, page, size: pageSize }
    );
  }

  @throws("Failed to get agent")
  async getAgent(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/admin/users/agents/${id}`);
  }

  @throws("Failed to delete agent")
  async deleteAgent(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/admin/users/agents/${id}`);
  }

  @throws("Failed to update agent")
  async updateAgent(
    id: number, 
    firstName: string,
    lastName: string,
    email: string, 
    phoneNumber: string,
    availability: boolean,
  ): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/agents/${id}`,
      { firstName, lastName, email, phoneNumber, availability },
      undefined,
      EContentTypes.multipart
    );
  }

  @throws("Failed to change agent profile picture")
  async changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/agents/${id}`,
      undefined,
      { profilePhoto: [profilePhoto] }
    );
  }

  @throws("Failed to create agent")
  async createAgent(
    firstName: string, 
    lastName: string, 
    email: string, 
    phoneNumber: string, 
    city: string,
    profilePhoto: File,
    rideId: number,
    password: string, 
  ): Promise<IJsonResponse> {
    return await this.http.post(
      "/admin/users/agents",
      { firstName, lastName, email, phoneNumber, rideId, password, city },
      { profilePhoto: [profilePhoto] }
    );
  }

  @throws("Failed to update agent credentials")
  async updateAgentCredentials(id: number, email: string, password: string): Promise<IJsonResponse> {
    return await this.http.patch(
      `/admin/users/agents/${id}/credentials`,
      { email, password: password || undefined }
    );
  }

  @throws("Failed to update agent availability")
  async toggleAgentAvailability(id: number): Promise<IJsonResponse> {
    return await this.http.patch(`/deliveryagents/${id}/availability`);
  }

  @throws("Failed to get active agents")
  async getActiveAgents(search: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    return await this.http.get(
      "/deliveryagents/active",
      { search, page, size: pageSize }
    );
  }
}
