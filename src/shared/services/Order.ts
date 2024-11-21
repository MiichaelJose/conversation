import { apiQueue } from "./Apis";

interface FilterParams {
  contactStatus?: string;
  paymentMethod?: string;
  paymentStatus?: string;
}

interface OrderResponse {
  orders?: any;
  total?: number;
  totalPages?: number;
}

export const getOrders = async (
  filters: FilterParams,
  currentPage: number,
  pageSize: number,
): Promise<OrderResponse> => {
  const userParticipantId = 97; //localStorage.getItem("userParticipantId");

  if (!userParticipantId) {
    throw new Error("userParticipantId não encontrado no localStorage.");
  }

  const baseUrl = "/webhook/orders";

  const params: Array<string> = [`userParticipantId=${encodeURIComponent(userParticipantId)}`];

  if (filters.contactStatus) {
    params.push(`contactStatus=${encodeURIComponent(filters.contactStatus)}`);
  }
  if (filters.paymentMethod) {
    params.push(`paymentMethod=${encodeURIComponent(filters.paymentMethod)}`);
  }
  if (filters.paymentStatus) {
    params.push(`paymentStatus=${encodeURIComponent(filters.paymentStatus)}`);
  }

  params.push(`page=${encodeURIComponent(currentPage)}`);
  params.push(`pageSize=${encodeURIComponent(pageSize)}`);

  const queryString = params.join("&");

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

export default getOrders;
