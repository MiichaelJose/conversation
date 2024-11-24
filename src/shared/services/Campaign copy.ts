import { apiRankingConversion } from "./Apis";



export const getReports = async (projectId: string): Promise<any> => {

  const baseUrl = '/reports/'+projectId
  
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