import EPractitionerTypes from "@/types/EPractitionerTypes";
import EServices from "@/types/EServices";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IAdminPractitionersClient } from ".";

@serviceClass(EServices.adminPractitioners)
class AdminPractitionersClient extends Service implements IAdminPractitionersClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getPractitioners(type: EPractitionerTypes, query: string, page: number = 1, pageSize: number = 100): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        "/admin/users/practitioners",
        {
          type,
          query,
          page,
          size: pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load practitioners")
      );
    }
  }

  async getPractitioner(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(`/admin/users/practitioners/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to load practitioner")
      );
    }
  }

  async deletePractitioner(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.delete(`/admin/users/practitioners/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to delete practitioner")
      );
    }
  }
}
