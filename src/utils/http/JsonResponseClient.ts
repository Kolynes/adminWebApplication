import Service from "../services/Service";
import { delay } from "../time";
import EContentTypes from "../types/EContentTypes";
import IIndexableObject from "../types/IIndexableObject";
import IJsonResponse from "../types/IJsonResponse";
import IJsonResponseClient, { JsonResponseAdapter } from "../types/IJsonResponseClient";

export default class JsonResponseClient extends Service implements IJsonResponseClient {
  protected baseUrl: string = ""; 
  protected headers: IIndexableObject = {};
  jsonResponseAdapter!: JsonResponseAdapter;
  protected debug: boolean = false;
  protected facade: IIndexableObject<IJsonResponse> = {};

  private async exec(
    url: string, 
    method: string, 
    body?: IIndexableObject, 
    files?: IIndexableObject<FileList | File[]>,
    contentType?: EContentTypes
  ): Promise<IJsonResponse> {
    if(this.debug) {
      await delay(2000);
      console.log(url)
      if(this.facade != {})
        return this.facade[url.split("?")[0]];
    }
    const processedHeaders = <IIndexableObject>{};
    for (var key in this.headers)
      if (this.headers[key] instanceof Function)
        processedHeaders[key] = await this.headers[key]();
      else processedHeaders[key] = this.headers[key];
    const response = await fetch(this.buildUrl(url), {
      method,
      headers: processedHeaders,
      body: this.buildBody(method, body, files, contentType),
    });
    return await this.jsonResponseAdapter(response);
  }

  private buildBody(
    method: string, 
    body?: IIndexableObject, 
    files?: IIndexableObject<FileList | File[]>,
    contentType?: EContentTypes
  ): BodyInit | null | undefined {
    if (method == "GET" || method == "HEAD")
      return null;
    else if (files || contentType == EContentTypes.multipart) {
      var formData = new FormData();
      for (var fileKey in files)
        for (var file of files[fileKey])
          formData.append(fileKey, file);
      if (body)
        for (var key in body)
          formData.append(key, body[key]);
      return formData;
    }
    else if (!body)
      return undefined;
    else return JSON.stringify(body);
  }

  private buildUrl(url: string) {
    let reqURL;
    if (this.baseUrl) reqURL = new URL(url, this.baseUrl);
    else reqURL = new URL(url);
    return reqURL.href;
  }

  public get(url: string, query: IIndexableObject = {}): Promise<IJsonResponse> {
    const params = new URLSearchParams(query);
    let reqUrl;
    console.log(url)
    if (url.includes("?")) reqUrl = `${url}&${params.toString()}`;
    else reqUrl = `${url}?${params.toString()}`;
    return this.exec(reqUrl, "GET",);
  }

  public post(
    url: string, 
    data?: IIndexableObject, 
    files?: IIndexableObject<FileList | File[]>,
    contentType?: EContentTypes
  ): Promise<IJsonResponse> {
    return this.exec(url, "POST", data, files, contentType);
  }

  public patch(
    url: string, 
    data?: IIndexableObject, 
    files?: IIndexableObject<FileList | File[]>,
    contentType?: EContentTypes
    ): Promise<IJsonResponse> {
    return this.exec(url, "PATCH", data, files, contentType);
  }

  public put(url: string, data?: IIndexableObject, contentType?: EContentTypes): Promise<IJsonResponse> {
    return this.exec(url, "PUT", data, {}, contentType);
  }

  public delete(url: string, data?: IIndexableObject, contentType?: EContentTypes): Promise<IJsonResponse> {
    return this.exec(url, "DELETE", data, {}, contentType);
  }
}
