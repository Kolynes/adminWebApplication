export default interface IIndexableObject<T = any> {
  [key: string]: T;
}