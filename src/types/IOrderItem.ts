import IProduct from "./IProduct";

export default interface IOrderItem {
  id: number;
  prescriptions: string[];
  price: number;
  product: IProduct;
  quanitity: number;
}