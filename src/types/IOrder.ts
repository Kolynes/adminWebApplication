import EOrderTypes from "./EOrderTypes";
import IOrderItem from "./IOrderItem";

export default interface IOrder {
  id: number;
  date: string;
  status: EOrderTypes;
  prescriptionUrl?: string;
  totalPrice: number;
  orderItems: IOrderItem[];
  trackingNumber: string;
  deliveryAddress: string;
  agentId: number | null;
  customerId: number;
}