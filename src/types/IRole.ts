import ERoleTypes from "./ERoleTypes";

export default interface IRole {
  id: string;
  name: ERoleTypes;
  description: string;
  createdOnDate: string;
}