import { useEffect, useState } from 'react';
import { MessageCircle, Edit2 } from 'lucide-react';
import { getOrders, updateMessage } from '@/shared/services/Order';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from '@/components/ui/skeleton';
import { Order } from '@/shared/types/OrdersTypes';
import { getCampaigns } from '@/shared/services/Campaign';


// const mockOrders: Order[] = [
//   {
//     id: '1',
//     productName: 'Smartphone XYZ',
//     customerName: 'João Silva',
//     customerPhone: '5511999999999',
//     purchaseDate: '2024-03-15',
//     status: 'Aguardando Contato',
//     observation: 'Cliente solicitou entrega expressa',
//     whatsappClicks: 3,
//     linkClicks: 1,
//   },
// ];

const statusFilters = [
  {not_contacted: 'Aguardando Contato'},
  {billet_due: 'Vencendo'},
  {billet_expired: 'Vencido'},
  {follow_up: 'Acompanhamento'},
  {in_progress: 'Em Contato'},
  {converted: 'Convertidas'}
];

type FilterParams = {
  contactStatus?: string;
  paymentMethod?: string;
  paymentStatus?: string;
}


export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [previewMessage, setPreviewMessage] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<FilterParams>({
    contactStatus: 'not_contacted',
    paymentMethod: '',
    paymentStatus: ''
  });
  const [editingObservation, setEditingObservation] = useState<{id: string, observation: string} | null>(null);
  const [saveObservation, setSaveObservation] = useState(false);

  const [orders, setOrders] = useState<any>([]);
  const [pages, setPages] = useState(1);
  const [activePages, setActivePages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [campaigns, setCampaigns] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetchOrders();
    fetchOrdersCampaigns();
  }, [selectedFilter, pages, saveObservation]);

  useEffect(() => {
    setPages(1)
    setActivePages(1)
  }, [selectedFilter]);


  const fetchOrders = async () => {
    try {
      const data = await getOrders(selectedFilter, pages);
      setOrders(data.orders)
      setTotalPages(data.totalPages)
      setTotalOrders(data.total)
    } catch (error: any) {
      // /setError("Erro ao carregar os pedidos");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersCampaigns = async () => {
    try {
        const campaigns: any = await getCampaignsWithClickStatus("18");
        console.log(campaigns);
        
        setCampaigns(campaigns);
    } catch (error: any) {
      // setError("Erro ao carregar os pedidos");
    } finally {
      // setLoading(false);
    }
  }

  const fetchCampaigns = async () => {
    try {
      const statusToTypeMap: Record<string, string> = {
        not_contacted: "pending",
        billet_due: "billet_due",
        billet_expired: "billet_expired",
        follow_up: "follow_up",
        converted: "follow_up",
      };
  
      const contactStatus = selectedFilter.contactStatus || "not_contacted";
      const campaignType = statusToTypeMap[contactStatus];
  
      if (campaignType) {
        const campaigns: any = await getCampaigns({ type: campaignType });
        setCampaigns(campaigns);
      }
    } catch (error: any) {
      // setError("Erro ao carregar os pedidos");
    } finally {
      // setLoading(false);
    }
  };
  
  // const handleWhatsAppClick = async (order: Order) => {
  //   const message = `Olá ${order.customerName}, sobre seu pedido ${order.id}...`;
  //   try {
  //     await axios.post('/api/read', { orderId: order.id });
  //   } catch (error) {
  //     console.error('Error updating click count:', error);
  //   }
  //   window.open(
  //     `https://wa.me/${order.customerPhone}?text=${encodeURIComponent(message)}`,
  //     '_blank'
  //   );
  // };

  const showMessagePreview = (order: Order) => {
    const message = `Olá ${order.customer.name}, sobre seu pedido ${order.id}...`;
    setPreviewMessage(message);
  };

  const hideMessagePreview = () => {
    setPreviewMessage('');
  };

  const handleObservationSave = async () => {
    if (!editingObservation) return;
    
    try {
      await updateMessage(
        editingObservation.id,
        editingObservation.observation
      )
      setEditingObservation(null);
    } catch (error) {
      console.error('Error updating observation:', error);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPages(page);
      setActivePages(page);
    }
  };

  // const filteredOrders = selectedFilter 
  //   ? mockOrders.filter(order => order.status === selectedFilter.contactStatus)
  //   : mockOrders;

  const paginations = () => {
    const paginationNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
  
    return paginationNumbers.map((pageNumber) => (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault()
            handlePageChange(pageNumber);
          }}
          className={`px-4 py-2 rounded ${
            activePages === pageNumber
              ? "bg-blue-500 text-white font-bold"
              : "bg-gray-200 text-black"
          }`}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <div className="relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
        {statusFilters.map((filter) => {
          const [tag, content] = Object.entries(filter)[0]; 
          
          return (
            <button
              key={tag}
              onClick={() =>
                setSelectedFilter(
                  tag === selectedFilter.contactStatus 
                    ? selectedFilter 
                    : { contactStatus: tag }
                )
              }
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter.contactStatus === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {content}
            </button>
          );
        })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Observação
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {totalOrders == 0 && !loading && (
              <tr className="italic text-gray-400  rounded-md">
                <td className="px-2 py-3 rounded-md" colSpan={6}>
                  Nenhum pedido encontrado.
                </td>
              </tr>
            )}

            {loading && (
              <tr className="  rounded-md">
                <td className="px-2 py-3 rounded-md" colSpan={6}>
                  <Skeleton className="w-full rounded-md" />
                </td>
              </tr>
            )}

            {orders.map((order: Order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4">
                  {order.products?.map((product: any) => 
                    <p>{product.title}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  {order.customer.name}
                </td>
                <td className="px-6 py-4">{order.orderCreatedAt}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className='truncate w-8'>{order.message}</span>
                    <button
                      onClick={() => {
                        setEditingObservation({ id: order.id, observation: order.message })
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Detalhes
                    </button>
                    <div className="relative">

                    {campaigns.map((e: any) => {
                        return (
                          <button
                          onMouseEnter={() => showMessagePreview(order)}
                          onMouseLeave={hideMessagePreview}
                          // onClick={() => handleWhatsAppClick(order)}
                          className="relative"
                        >
                          <MessageCircle className="w-6 h-6 text-green-500 hover:text-green-600" />
                          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {e.id}
                          </span>
                          {/* <span className="absolute -bottom-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {e.id}
                          </span> */}
                        </button>
                        );
                      })
                    }
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages !== 0 && (
        <Pagination className="mt-5 text-bluesecundary">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => handlePageChange(1)} />
            </PaginationItem>

            {pages > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {paginations()}

            {pages < totalPages - 1 && totalPages > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext href="#" onClick={() => handlePageChange(totalPages)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {previewMessage && (
        <div className="fixed bottom-4 left-4 max-w-sm">
          <div className="bg-[#DCF8C6] p-4 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-end">
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                <p className="text-gray-700">{previewMessage}</p>
                <p className="text-xs text-gray-500 text-right mt-1">12:00</p>
              </div>
            </div>
          </div>
        </div>
      )} 

      {editingObservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Editar Observação</h3>
            <textarea
              value={editingObservation.observation}
              onChange={(e) => setEditingObservation({
                ...editingObservation,
                observation: e.target.value
              })}
              className="w-full p-2 border rounded-md"
              rows={4}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingObservation(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleObservationSave()
                  setSaveObservation(!saveObservation)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Detalhes do Pedido</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">ID:</p>
                <p>{selectedOrder.id}</p>
              </div>
              <div>
                <p className="font-semibold">Produto:</p>
                <ul>{selectedOrder.products?.map((e) => 
                  <li>{e.title}</li>
                  )}
                </ul>
              </div>
              <div>
                <p className="font-semibold">Cliente:</p>
                <p>{selectedOrder.customer.name}</p>
              </div>
              <div>
                <p className="font-semibold">Telefone:</p>
                <p>{selectedOrder.customer.phone}</p>
              </div>
              <div>
                <p className="font-semibold">Data:</p>
                <p>{selectedOrder.orderCreatedAt}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p>{selectedOrder.status}</p>
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Observação:</p>
                <p>{selectedOrder.message}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}