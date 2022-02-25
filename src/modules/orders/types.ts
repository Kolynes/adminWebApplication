import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { IAgent, ILocation } from "../agents/types";
import { IUser } from "../auth/types";
import { IProduct } from "../products/types";

export enum EOrderTypes {
  unassigned = "UNASSIGNED",
  accepted = "ACCEPTED",
  assigned = "ASSIGNED",
  fulfilled = "FULFILLED",
  failed = "FAILED"
}

export interface ITransaction {
  charge: { amount: string, reference: string, accessCode: string }
  confirmDate: string | Date;
  description: string;
  expirationDate: string | Date;
  id: number
  initDate: string | Date;
  receipt: any;
  status: string;
  user: IUser;
}

export interface IOrderItem {
  id: number;
  prescriptions: string[];
  price: number;
  product: IProduct;
  quanitity: number;
}

export interface IOrder {
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

export interface IAdminOrdersClient extends Service {
  getOrders(
    status: EOrderTypes | null,
    search: string,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getOrder(id: number): Promise<IJsonResponse>;

  deleteOrder(id: number): Promise<IJsonResponse>;

  assignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse>;

  unassignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse>;
}

