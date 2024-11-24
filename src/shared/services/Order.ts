import { apiQueue } from "./Apis";

interface FilterParams {
  contactStatus?: string;
  paymentMethod?: string;
  paymentStatus?: string;
}

interface OrderResponse {
  orders: any;
  totalPages: number;
  total: number;
}

export const getOrders = async (
  filters: FilterParams,
  page: number,
): Promise<OrderResponse> => {

  console.log(page);
  console.log(filters);
  
  const userParticipantId = 97; //localStorage.getItem("userParticipantId");

  if (!userParticipantId) {
    throw new Error("userParticipantId não encontrado no localStorage.");
  }

  const baseUrl = "/webhook/orders";

  const params: Array<string> = [`userParticipantId=${encodeURIComponent(userParticipantId)}`];

  if (filters.contactStatus) {
    params.push(`customerContactStatus=${encodeURIComponent(filters.contactStatus)}`);
  }
  if (filters.paymentMethod) {
    params.push(`paymentMethod=${encodeURIComponent(filters.paymentMethod)}`);
  }
  if (filters.paymentStatus) {
    params.push(`paymentStatus=${encodeURIComponent(filters.paymentStatus)}`);
  }

  params.push(`page=${encodeURIComponent(page)}`);
  // params.push(`pageSize=${encodeURIComponent(pageSize)}`);

  const queryString = params.join("&");

  console.log(queryString);
  

  const response = await apiQueue
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


export const updateMessage = async (
  id: string,
  message: string
): Promise<any> => {
  const baseUrl = "/webhook/orders/"+ id;


  const response = await apiQueue
    .patch(`${baseUrl}`, JSON.stringify({ message: message }))
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
