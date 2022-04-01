import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { ICustomer } from "../customers/types";
import { ITransaction } from "../orders/types";
import { IOrganization } from "../organizations/types";
import { IPractitioner } from "../practitioners/types";

export enum EDrugTypes {
  otc = "OTC",
  pom = "POM"
}

export enum EProductTypes {
  drug = "DRUG",
  equipment = "EQUIPMENT"
}

export interface IProduct {
  id: number;
  name: string;
  organization: IOrganization;
  description: string;
  productImage: string;
  price: number;
  quantityInStock: number;
  dosage: string;
  drugType: EDrugTypes;
  productType: EProductTypes;
}

export interface IPayment {
  createdOnDate: string;
  customer: ICustomer;
  id: number;
  isDeleted: boolean;
  organization: IOrganization;
  practitioner: IPractitioner;
  product: IProduct;
  transaction: ITransaction;
}

export interface IClick {
  createdOnDate: Date;
  customer: ICustomer;
  id: number;
  isDeleted: boolean;
  organization: IOrganization;
  practitioner: IPractitioner;
  product: IProduct;
}

export interface IProductsClient extends Service {
  getProducts(
    type: EProductTypes,
    query: string, 
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getProduct(id: number): Promise<IJsonResponse>;

  getProductsByOrganization(
    id: number,
    type: string, 
    query: string,
    page?: number, 
    pageSize?: number
  ): Promise<IJsonResponse>;

  createProduct(
    name: string,
    description: string,
    image: File,
    price: number,
    quantityInStock: number,
    dosage: string,
    drugType: EDrugTypes,
    productType: EProductTypes
  ): Promise<IJsonResponse>;

  createProductForOrganization(
    organizationId: number,
    name: string,
    description: string,
    image: File,
    price: number,
    quantityInStock: number,
    dosage: string,
    drugType: EDrugTypes,
    productType: EProductTypes 
  ): Promise<IJsonResponse>;

  deleteProduct(id: number): Promise<IJsonResponse>;

  updateProduct(
    id: number,
    name: string,
    description: string,
    price: number,
    quantityInStock: number,
    dosage: string,
    drugType: string,
    productType: string
  ): Promise<IJsonResponse>;

  changeProductImage(id: number, image: File): Promise<IJsonResponse>;
}

export interface IProductEditor {
  toggleCreateProductDialog(organizationId?: number): void;
  beginEditProduct(product: IProduct): void;
}