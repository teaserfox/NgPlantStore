import {DefaultResponseType} from "../../../types/default-response.type";


export function checkResponse<T>(data: T | DefaultResponseType): T {
  if ((data as DefaultResponseType).error !== undefined) {
    throw new Error((data as DefaultResponseType).message);
  }

  return data as T;
}
