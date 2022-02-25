export default interface ILoaderResponse<T> {
  items: T[];
  hasNextPage: boolean
}