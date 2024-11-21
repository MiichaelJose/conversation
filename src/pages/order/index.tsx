import React, { useState } from 'react';
import { MessageCircle, Edit2 } from 'lucide-react';
import axios from 'axios';

interface Order {
  id: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  purchaseDate: string;
  status: string;
  observation: string;
  whatsappClicks: number;
  linkClicks: number;
}

const mockOrders: Order[] = [
  {
    id: '1',
    productName: 'Smartphone XYZ',
    customerName: 'João Silva',
    customerPhone: '5511999999999',
    purchaseDate: '2024-03-15',
    status: 'Aguardando Contato',
    observation: 'Cliente solicitou entrega expressa',
    whatsappClicks: 3,
    linkClicks: 1,
  },
  // Add more mock orders...
];

const statusFilters = [
  'Aguardando Contato',
  'Vencendo',
  'Vencido',
  'Acompanhamento',
  'Em Contato',
  'Convertidas'
];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [previewMessage, setPreviewMessage] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [editingObservation, setEditingObservation] = useState<{id: string, observation: string} | null>(null);

  const handleWhatsAppClick = async (order: Order) => {
    const message = `Olá ${order.customerName}, sobre seu pedido ${order.id}...`;
    
    try {
      await axios.post('/api/read', { orderId: order.id });
      // Update click count locally
      // In real implementation, you would fetch updated data from the server
    } catch (error) {
      console.error('Error updating click count:', error);
    }
    
    window.open(
      `https://wa.me/${order.customerPhone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const showMessagePreview = (order: Order) => {
    const message = `Olá ${order.customerName}, sobre seu pedido ${order.id}...`;
    setPreviewMessage(message);
  };

  const hideMessagePreview = () => {
    setPreviewMessage('');
  };

  const handleObservationSave = async () => {
    if (!editingObservation) return;
    
    try {
      // In real implementation, make API call to update observation
      await axios.put(`/api/orders/${editingObservation.id}/observation`, {
        observation: editingObservation.observation
      });
      setEditingObservation(null);
    } catch (error) {
      console.error('Error updating observation:', error);
    }
  };

  const filteredOrders = selectedFilter 
    ? mockOrders.filter(order => order.status === selectedFilter)
    : mockOrders;

  return (
    <div className="relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {statusFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter === selectedFilter ? '' : filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
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
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4">{order.productName}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">{order.purchaseDate}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span>{order.observation}</span>
                    <button
                      onClick={() => setEditingObservation({ id: order.id, observation: order.observation })}
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
                      <button
                        onMouseEnter={() => showMessagePreview(order)}
                        onMouseLeave={hideMessagePreview}
                        onClick={() => handleWhatsAppClick(order)}
                        className="relative"
                      >
                        <MessageCircle className="w-6 h-6 text-green-500 hover:text-green-600" />
                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {order.whatsappClicks}
                        </span>
                        <span className="absolute -bottom-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {order.linkClicks}
                        </span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                onClick={handleObservationSave}
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
                <p>{selectedOrder.productName}</p>
              </div>
              <div>
                <p className="font-semibold">Cliente:</p>
                <p>{selectedOrder.customerName}</p>
              </div>
              <div>
                <p className="font-semibold">Telefone:</p>
                <p>{selectedOrder.customerPhone}</p>
              </div>
              <div>
                <p className="font-semibold">Data:</p>
                <p>{selectedOrder.purchaseDate}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p>{selectedOrder.status}</p>
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Observação:</p>
                <p>{selectedOrder.observation}</p>
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