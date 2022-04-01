import { EServices } from "@/types";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { EDrugTypes, EProductTypes, IProductsClient } from "../types";

@serviceClass(EServices.products)
class ProductsClient extends Service implements IProductsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

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

  async getProduct(id: number): Promise<IJsonResponse> {
    return await this.http.get(`/products/${id}`);
  }

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

  async deleteProduct(id: number): Promise<IJsonResponse> {
    return await this.http.delete(`/products/delete/${id}`);
  }

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