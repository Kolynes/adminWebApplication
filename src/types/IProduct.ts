import EDrugTypes from "./EDrugTypes";
import EProductTypes from "./EProductTypes";
import IOrganization from "./IOrganization";

export default interface IProduct {
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