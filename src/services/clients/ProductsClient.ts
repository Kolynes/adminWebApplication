import EDrugTypes from "@/types/EDrugTypes";
import EProductTypes from "@/types/EProductTypes";
import EServices from "@/types/EServices";
import JsonResponseErrors from "@/utils/http/JsonResponseErrors";
import Service, { serviceClass } from "@/utils/services/Service";
import { service } from "@/utils/services/ServiceProvider";
import EContentTypes from "@/utils/types/EContentTypes";
import IJsonResponse from "@/utils/types/IJsonResponse";
import IJsonResponseClient from "@/utils/types/IJsonResponseClient";
import { IProductsClient } from "./clients";


@serviceClass(EServices.products)
class ProductsClient extends Service implements IProductsClient {
  @service(EServices.http)
  private http!: IJsonResponseClient;

  async getProducts(
    type: EProductTypes,
    location: string,
    query: string = "", 
    page: number = 1,
    pageSize: number = 100,
  ): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        "/products/all",
        {
          page,
          query,
          type,
          size: pageSize,
          location
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to fetch products")
      );
    }
  }

  async getProduct(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.get(`/products/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to fetch product")
      );
    }
  }

  async getProductsByOrganization(
    id: number, 
    type: string, 
    query: string, 
    page: number, 
    pageSize: number
  ): Promise<IJsonResponse> {
    try {
      return await this.http.get(
        `/products/organizations/${id}`,
        {
          page,
          query,
          type,
          pageSize
        }
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to fetch products")
      );
    }
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
    try {
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
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to create product")
      );
    }
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
    try {
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
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to create product")
      );
    }
  }

  async deleteProduct(id: number): Promise<IJsonResponse> {
    try {
      return await this.http.delete(`/products/delete/${id}`);
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to delete product")
      );
    }
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
    try {
      return await this.http.post(
        `/products/update/${id}`,
        {
          name,
          description,
          price,
          quantityInStock,
          dosage,
          drugType,
          productType
        },
        {},
        EContentTypes.multipart
      );
    } catch(e) {
      console.log(e);
      return this.http.jsonResponseAdapter(
        undefined,
        new JsonResponseErrors("Failed to create product")
      );
    }
  }

  async changeProductImage(id: number, image: File): Promise<IJsonResponse> {
    try {
      return await this.http.patch(
        `/products/update/${id}`,
        {},
        {
          image: [image]
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
}