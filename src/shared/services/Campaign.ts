import { apiRankingConversion } from "./Apis";

interface CreateCampaign {
  name: string;
  type: string;
  displayOrder: number;
  paymentMethod: string;
  status: string;
  message: string;
  userId?: number;
}


interface FilterParams {
  type?: string;
  userId?: string;
}


export const createCampaign = async (data: CreateCampaign): Promise<any> => {
  data.userId = 97;

  const baseUrl = "/campaigns";

  const response = await apiRankingConversion
    .post(`${baseUrl}`, JSON.stringify(data))
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



// export const getOrdersCampaigns = async (projectId: string): Promise<OrderCampaign[]> => {
//   const baseUrl = "/orders/campaigns/"+projectId;


//   const response = await apiRankingConversion
//     .get(`${baseUrl}`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       if (error.response.status == 400) {
//         return {
//           error: "Dados Incorretos",
//         };
//       }
//     });

//   return response;
// };


export const getCampaigns = async (filters: FilterParams = { type: "" }): Promise<any> => {
  const userId = 97; //localStorage.getItem("userParticipantId");

  if (!userId) {
    throw new Error("userId não encontrado no localStorage.");
  }

  const baseUrl = "/campaigns";

  const params: Array<string> = [`userId=${encodeURIComponent(userId)}`];

  if (filters.type) {
    params.push(`type=${encodeURIComponent(filters.type)}`);
  }

  const queryString = params.join("&");

  const response = await apiRankingConversion
    .get(`${baseUrl}?${queryString}`)
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

export const saveCampaign = async (data: any): Promise<any> => {
  const baseUrl = "/campaigns";

  const response = await apiRankingConversion
    .put(`${baseUrl}`, data)
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
