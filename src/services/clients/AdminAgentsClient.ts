import EServices from "@/types/EServices";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminAgentsClient } from ".";

@serviceClass(EServices.adminAgent)
export default class AdminAgentsClient extends Service implements IAdminAgentsClient {

  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getAgents(query: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        "/admin/users/agents",
        {
          query,
          page,
          size: pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load agents")
      );
    }
  }

  async getAgent(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(`/admin/users/agents/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load agent")
      );
    }
  }

  async deleteAgent(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.delete(`/admin/users/agents/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to delete agent")
      );
    }
  }

  async updateAgent(
    id: number, 
    name: string,
    email: string, 
    phoneNumber: string,
    availability: boolean,
  ): Promise<IJsonResponse> {
    try {
      return await this.http.patch(
        `/admin/users/agents/${id}`,
        {
          name,
          email,
          phoneNumber,
          availability,
        },
        {},
        EContentTypes.multipart
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to update agent")
      );
    }
  }

  async changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse> {
    try {
      return await this.http.patch(
        `/admin/users/agents/${id}`,
        {},
        {
          file: [profilePhoto]
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to change agent profile photo")
      );
    }
  }

  async createAgent(
    name: string, 
    email: string, 
    phoneNumber: string, 
    profilePhoto: File,
    rideId: number,
    password: string, 
  ): Promise<IJsonResponse> {
    try {
      return await this.http.post(
        "/admin/users/agents",
        {
          name,
          email,
          phoneNumber,
          rideId,
          password,
        },
        {
          file: [profilePhoto]
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to create agent")
      );
    }
  }

  async updateAgentCredentials(id: number, email: string, password: string): Promise<IJsonResponse> {
    try {
      return await this.http.post(
        `/admin/users/agents/${id}/credentials`,
        {
          email,
          password,
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to update agent credentials")
      );
    }
  }

  async toggleAgentAvailability(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.patch(`/deliveryagents/${id}/availability`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to update agent availability")
      );
    }
  }

  async getActiveAgents(query: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        "/deliveryagents/active",
        {
          query,
          page,
          size: pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to get active agents")
      );
    }
  }
}
