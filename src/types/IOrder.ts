import EOrderTypes from "./EOrderTypes";
import IAgent from "./IAgent";
import ILocation from "./ILocation";
import IOrderItem from "./IOrderItem";
import ITransaction from "./ITransaction";

export default interface IOrder {
  id: number;
  createdOnDate: string | Date;
  status: EOrderTypes;
  totalPrice: number;
  orderItems: IOrderItem[];
  destination: ILocation;
  deliveryAgent: IAgent | null;
  transaction: ITransaction;
  customerSignature: string;
}