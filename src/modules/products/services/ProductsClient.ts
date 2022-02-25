import { EServices } from "@/types";
import { throwsFactory } from "@/utils/error-management";
import JsonResponse from "@/utils/http/JsonResponse";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EDrugTypes, EProductTypes, IProductsClient } from "../types";

const throws = throwsFactory(JsonResponse.createJsonResponse);


@serviceClass(EServices.products)
class ProductsClient extends Service implements IProductsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  @throws("Failed to get products")
  async getProducts(
    type: EProductTypes,
    query: string = "",
    page: number = 1,
    pageSize: number = 100,
  ): Promise<IJsonResponse> {
    return await this.http.get(
      "/products/search",
      {
        page,
        query,
        type,
        size: pageSize,
      }
    );
  }

  @throws("Failed to get product")
  async getProduct(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/products/${id}`);
  }

  @throws("Failed to get products")
  async getProductsByOrganization(
    id: number,
    type: string,
    query: string,
    page: number,
    pageSize: number
  ): Promise<IJsonResponse> {
    return await this.http.get(
      `/products/organizations/${id}`,
      {
        page,
        query,
        type,
        pageSize
      }
    );
  }

  @throws("Failed to create product")
  async createProduct(
    name: string,
    description: string,
    image: File,
    price: number,
    quantityInStock: number,
    dosage: string,
    drugType: EDrugTypes,
    productType: EProductTypes
  ): Promise<IJsonResponse> {
    return await this.http.post(
      "/products/create",
      {
        name,
        description,
        price,
        quantityInStock,
        dosage,
        drugType,
        productType
      },
      {
        image: [image]
      }
    );
  }

  @throws("Failed to create product")
  async createProductForOrganization(
    organizationId: number,
    name: string,
    description: string,
    image: File,
    price: number,
    quantityInStock: number,
    dosage: string,
    drugType: EDrugTypes,
    productType: EProductTypes
  ): Promise<IJsonResponse> {
    return await this.http.post(
      `/products/create/organizations/${organizationId}`,
      {
        organizationId,
        name,
        description,
        price,
        quantityInStock,
        dosage,
        drugType,
        productType
      },
      {
        image: [image]
      }
    );
  }

  @throws("Failed to delete product")
  async deleteProduct(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/products/delete/${id}`);
  }

  @throws("Failed to update product")
  async updateProduct(
    id: number,
    name: string,
    description: string,
    price: number,
    quantityInStock: number,
    dosage: string,
    drugType: string,
    productType: string
  ): Promise<IJsonResponse> {
    return await this.http.patch(
      `/products/update/${id}`,
      {
        name,
        description,
        price,
        quantityInStock,
        dosage,
        drugType,
        productType
      }
    );
  }

  @throws("Failed to change product image")
  async changeProductImage(id: number, image: File): Promise<IJsonResponse> {
    return await this.http.patch(
      `/products/update/${id}`,
      undefined,
      {
        image: [image]
      }
    );
  }
}