import { apiRankingConversion } from "./Apis";

type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
  };
};
type ErrorResponse = {
  error: string;
};

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse | ErrorResponse | any> => {
  const access = await apiRankingConversion
    .post<LoginResponse>("/sessions", credentials)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status == 400) {
        return {
          error: "Dados Incorretos",
        };
      }
    });

  return access;
};

export default login;
