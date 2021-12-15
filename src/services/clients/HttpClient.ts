import EServices from "@/types/EServices";
import JsonResponse from "@/utils/http/JsonResponse";
import JsonResponseClient from "@/utils/http/JsonResponseClient";
import { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IStoreService } from "../services";
import networkFacade from "./networkFacade";

@serviceClass(EServices.http)
class HttpClient extends JsonResponseClient implements IJsonResponseClient {
  @service(EServices.store)
  store!: IStoreService;

  initState() {
    this.baseUrl = "https://buymedixbackend.herokuapp.com/api/v1";
    this.headers = {
      Authorization: () => this.getToken()
    },
    this.debug = false;
    this.facade = networkFacade;
    this.jsonResponseAdapter = JsonResponse.createJsonResponse;
    super.initState();
  }

  async getToken(): Promise<string> {
    return this.store.adminModule.admin !== null && this.store.adminModule.admin !== undefined
      ? `Bearer ${this.store.adminModule.admin.token}`
      : "";
  }
}