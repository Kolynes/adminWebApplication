import ILocation from "./ILocation";

export default interface IOrganization {
  id: number;
  name: string;
  email: string;
  profilePhoto: string;
  description: string;
  location: ILocation;
  phoneNumber: string;
  type: string;
}