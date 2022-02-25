import JsonResponseErrors from "../http/JsonResponseErrors";
import IIndexableObject from "../types/IIndexableObject";

export function throwsFactory(returnType: Function) {
  return (summary: string, fields?: IIndexableObject): MethodDecorator => {
    return <T>(target: any, property: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {
      const clientMethod = target[property];
      const wrapper = async (...args: any[]) => {
        try {
          return await clientMethod.bind(target)(...args);
        } catch (e) {
          console.log(e);
          return returnType(undefined, new JsonResponseErrors(summary, fields));
        }
      }
      return {
        ...descriptor,
        value: wrapper as unknown as T
      }
    }
  }
}