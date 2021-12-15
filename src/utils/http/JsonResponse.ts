import IJsonResponse from "../types/IJsonResponse";
import IJsonResponseErrors from "./JsonResponseErrors";

export default class JsonResponse implements IJsonResponse {
    data?: any;
    numberOfPages?: number;
    nextPage?: number;
    previousPage?: number;
    errors?: IJsonResponseErrors;
    baseResponse?: Response;
  
    get status(): number {
      return this.baseResponse !== undefined 
        ?this.baseResponse.status
        :-1
    }
  
    get hasNextPage(): boolean {
      return this.nextPage != 0;
    }

    get hasPreviousPage(): boolean {
        return this.previousPage != 0;
    }
  
    private constructor(response?: Response) {
      if(response)
        this.baseResponse = response;
    }
  
    static async createJsonResponse<T>(baseResponse?: Response, errors?: IJsonResponseErrors): Promise<JsonResponse> {
      if(baseResponse != null) {
        let response = new JsonResponse(baseResponse);
        try {
          const json: IJsonResponse = await baseResponse.json();
          response.data = json.data;
          response.numberOfPages = json.numberOfPages;
          response.nextPage = json.nextPage;
          response.previousPage = json.previousPage;
          response.errors = json.errors;

        } finally {
          return response;
        }
      }
      else {
        const response = new JsonResponse();
        response.errors = errors;
        return response;
      }
    }
  }