import React, { useState } from 'react';
import { GitBranch, Plus } from 'lucide-react';

interface Flow {
  id: string;
  title: string;
  products: string[];
  events: string[];
  accounts: string[];
  removeFromAccount: string;
  status: string;
  formatting: string[];
}

const mockFlows: Flow[] = [
  {
    id: '1',
    title: 'Fluxo Cartão - Pagamento Pendente',
    products: ['Produto A', 'Produto B'],
    events: ['Boleto Gerado', 'Pix Gerado'],
    accounts: ['vendas@company.com'],
    removeFromAccount: 'Após converter',
    status: '1',
    formatting: ['Primeiro Nome', '#ID do pedido', 'Data de compra', 'Produto'],
  },
];

export default function OrderFlow() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFlow, setEditingFlow] = useState<Flow | null>(null);

  const handleSaveFlow = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call to save flow
    setShowAddModal(false);
    setEditingFlow(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Fluxo de Pedidos</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Fluxo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFlows.map((flow) => (
          <div
            key={flow.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <GitBranch className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{flow.title}</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="text-gray-600">Produtos:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {flow.products.map((product, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Eventos:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {flow.events.map((event, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() => setEditingFlow(flow)}
                    className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    Editar Fluxo
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(showAddModal || editingFlow) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingFlow ? 'Editar Fluxo' : 'Novo Fluxo'}
            </h3>
            <form onSubmit={handleSaveFlow}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome do fluxo
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingFlow?.title}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Produtos
                  </label>
                  <select
                    multiple
                    name="products"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="1">Produto A</option>
                    <option value="2">Produto B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Eventos
                  </label>
                  <select
                    multiple
                    name="events"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="1">Boleto Gerado</option>
                    <option value="2">Pix Gerado</option>
                    <option value="3">Checkout Abandonado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Conta do Google
                  </label>
                  <select
                    multiple
                    name="accounts"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="1">vendas@company.com</option>
                    <option value="2">suporte@company.com</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tempo para exclusão da agenda
                  </label>
                  <select
                    name="remove_from_account"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="after_convert">Após converter</option>
                    <option value="30_days">após 30 dias</option>
                    <option value="60_days">após 60 dias</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="0">Desativado</option>
                    <option value="1">Ativado</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formatação do Contato
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <select
                      key={num}
                      name={`formatting_${num}`}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Nada</option>
                      <option value="first_name">Primeiro Nome</option>
                      <option value="order_id">#ID do pedido</option>
                      <option value="purchase_date">Data de compra</option>
                      <option value="product">Produto</option>
                    </select>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingFlow(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}