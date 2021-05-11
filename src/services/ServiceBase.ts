import { CustomResponse } from "./../helpers/Retorno";
import api from "../interceptor/http-interceptor";
import ComboBase from "../view-models/ComboBase";

const ServiceBase = <T>(url: string) => {
  const GetCombo = async () => {
    try {
      const { data } = await api.get<CustomResponse<ComboBase<number>[]>>(
        `${url}combo`
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const GetAll = async () => {
    try {
      const { data } = await api.get<CustomResponse<T[]>>(url);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const Get = async (id: number) => {
    try {
      const { data } = await api.get<CustomResponse<T>>(`${url}${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const Insert = async (body: T) => {
    try {
      const { data } = await api.post<CustomResponse<T>>(url, body);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const Update = async (id: number, body: T) => {
    try {
      const { data } = await api.put<CustomResponse<T>>(`${url}${id}`, body);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const Delete = async (id: number) => {
    try {
      const { data } = await api.delete<CustomResponse<T>>(`${url}${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { GetAll, Get, Insert, Update, Delete, GetCombo };
};

export default ServiceBase;
