import JsonResponseErrors from "../http/JsonResponseErrors";
import Service from "../services/Service";
import EContentTypes from "./EContentTypes";
import IIndexableObject from "./IIndexableObject";
import IJsonResponse from "./IJsonResponse";

export type JsonResponseAdapter = (baseResponse?: Response, errors?: JsonResponseErrors) => Promise<IJsonResponse>;

export default interface IJsonResponseClient extends Service {
  readonly jsonResponseAdapter: JsonResponseAdapter;

  get(url: string, query?: IIndexableObject): Promise<IJsonResponse>;

  post(url: string, data?: IIndexableObject, files?: IIndexableObject<FileList | File[]>, contentType?: EContentTypes): Promise<IJsonResponse>;

  patch(url: string, data?: IIndexableObject, files?: IIndexableObject<FileList | File[]>, contentType?: EContentTypes): Promise<IJsonResponse>;

  put(url: string, data?: IIndexableObject, contentType?: EContentTypes): Promise<IJsonResponse>;

  delete(url: string, data?: IIndexableObject, contentType?: EContentTypes): Promise<IJsonResponse>;
} 