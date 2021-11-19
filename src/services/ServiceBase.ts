import { CustomResponse } from "./../helpers/Retorno";
import api from "../interceptor/http-interceptor";
import ComboBase from "../view-models/ComboBase";

export const GetCombo = async (url: string) => {
  try {
    const { data } = await api.get<CustomResponse<ComboBase<string>[]>>(
      `${url}/combo`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetAll = async <T>(url: string) => {
  try {
    const { data } = await api.get<CustomResponse<T[]>>(url);
    return data;
  } catch (error) {
    throw error;
  }
};

export const Get = async <T>(url: string, id: number | string) => {
  try {
    const { data } = await api.get<CustomResponse<T>>(`${url}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const Insert = async <T>(url: string, body: T) => {
  try {
    const { data } = await api.post<CustomResponse<T>>(url, body);
    return data;
  } catch (error) {
    throw error;
  }
};

export const Update = async <T>(url: string, body: T, id?: number | string) => {
  try {
    const { data } = await api.put<CustomResponse<T>>(`${url}/${id}`, body);
    return data;
  } catch (error) {
    throw error;
  }
};

export const Delete = async <T>(url: string, id: number | string) => {
  try {
    const { data } = await api.delete<CustomResponse<T>>(`${url}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
