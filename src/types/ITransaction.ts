import IUser from "./IUser";

export default interface ITransaction {
  charge: {amount: string, reference: string, accessCode: string }
  confirmDate: string | Date;
  description: string;
  expirationDate: string | Date;
  id: number
  initDate: string | Date;
  receipt: any;
  status: string;
  user: IUser;
}