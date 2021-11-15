export default interface IRide {
  id: number;
  name: string;
  model: string;
  brand: string;
  licensePlate: string;
  photo: string | File;
  assigned: boolean;
}