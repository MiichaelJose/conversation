import React, { useState } from 'react';
import { Mail, Plus, Edit2, Trash2 } from 'lucide-react';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  status: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
}

const mockCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'Recuperação de Carrinho',
    subject: 'Não perca suas ofertas especiais!',
    status: 'Ativo',
    sentCount: 1250,
    openRate: 45.8,
    clickRate: 12.3,
  },
  {
    id: '2',
    name: 'Boas-vindas',
    subject: 'Bem-vindo à nossa loja!',
    status: 'Pausado',
    sentCount: 890,
    openRate: 62.1,
    clickRate: 18.7,
  },
];

export default function Emails() {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call to add campaign
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Campanhas de Email</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Campanha
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-lg">{campaign.name}</h3>
                  <p className="text-gray-600">{campaign.subject}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Enviados</p>
                <p className="font-semibold text-lg">{campaign.sentCount}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Taxa de Abertura</p>
                <p className="font-semibold text-lg">{campaign.openRate}%</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Taxa de Clique</p>
                <p className="font-semibold text-lg">{campaign.clickRate}%</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  campaign.status === 'Ativo'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {campaign.status}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver Relatório
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Nova Campanha de Email</h3>
            <form onSubmit={handleAddCampaign}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome da Campanha
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assunto
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Conteúdo do Email
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Criar Campanha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}