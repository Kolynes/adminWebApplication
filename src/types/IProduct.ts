import EDrugTypes from "./EDrugTypes";
import EProductTypes from "./EProductTypes";

export default interface IProduct {
  id: number;
  name: string;
  organizationId: number;
  organizationName: string;
  description: string;
  image: string;
  price: number;
  quantityInStock: number;
  dosage: string;
  drugType: EDrugTypes;
  productType: EProductTypes;
}