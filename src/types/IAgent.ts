import ILocation from "./ILocation";
import IRide from "./IRide";

export default interface IAgent {
  id: number;
  email: string;
  city: string;
  location: ILocation;
  name: string;
  phoneNumber: string;
  profilePhoto: string;
  available: boolean;
  ride: IRide;
}