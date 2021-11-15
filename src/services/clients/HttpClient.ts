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
    this.baseUrl = "http://buymedixbackend.herokuapp.com/api/v1";
    this.headers = {
      Authorization: this.getToken
    },
      this.jsonResponseAdapter = JsonResponse.createJsonResponse;
    this.debug = true;
    this.facade = networkFacade;
    super.initState();
  }

  async getToken(): Promise<string> {
    return this.store.adminModule.admin !== null && this.store.adminModule.admin !== undefined
      ? this.store.adminModule.admin.token
      : "";
  }
}