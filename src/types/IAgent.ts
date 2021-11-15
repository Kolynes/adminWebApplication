import IRide from "./IRide";
import IUser from "./IUser";

export default interface IAgent extends IUser {
  available: boolean;
  ride: IRide;
}