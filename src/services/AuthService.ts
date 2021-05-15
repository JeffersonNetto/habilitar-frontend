import RegisterUserViewModel from "../view-models/RegisterUserViewModel";
import api from "../interceptor/http-interceptor";
import { CustomResponse } from "../helpers/Retorno";
import LoginResponseViewModel from "../view-models/LoginResponseViewModel";

const url = "auth/";

const AuthService = {
  Registrar: async (payload: RegisterUserViewModel) => {
    try {
      const { data } = await api.post<CustomResponse<LoginResponseViewModel>>(
        `${url}registrar`,
        payload
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
