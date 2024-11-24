import { apiRankingConversion } from "./Apis";

export const getGoogleCalendars = async (projectId: string): Promise<any> => {
    const baseUrl = "/googlecalendar/"+projectId;
  
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