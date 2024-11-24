import { apiRankingConversion } from "./Apis";

export const getUsers= async (): Promise<any> => {
    const baseUrl = "/users";
  
    const response = await apiRankingConversion
      .get(`${baseUrl}`)
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
  
    return response;
};