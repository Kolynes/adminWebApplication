import IIndexableObject from "../types/IIndexableObject";

export default class JsonResponseErrors {
  constructor(
    readonly summary: string, 
    readonly fields: IIndexableObject = {}
  ) {}
}