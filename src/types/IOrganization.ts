export default interface IOrganization {
  id: number;
  name: string;
  email: string;
  profilePhoto: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  phoneNumber: string;
  type: string;
}