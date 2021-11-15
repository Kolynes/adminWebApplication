import IProduct from "./IProduct";

export default interface IOrderItem extends IProduct {
  quantity: number;
}