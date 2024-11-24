import { useEffect, useState } from 'react';
import { Megaphone, Plus, Edit2, Trash2 } from 'lucide-react';
import { createCampaign, getCampaigns } from '../../shared/services/Campaign';

interface Campaign {
  id: string;
  name: string;
  type: string;
  paymentMethod: string;
  status: string;
  total: number;
  converted: number;
}

// const mockCampaigns: Campaign[] = [
//   {
//     id: '1',
//     name: 'Recuperação Cartão',
//     type: 'pending',
//     paymentMethod: '1',
//     status: '1',
//     totalContacts: 250,
//     convertedContacts: 45,
//   },
//   {
//     id: '2',
//     name: 'Recuperação PIX',
//     type: 'billet_due',
//     paymentMethod: '11',
//     status: '1',
//     totalContacts: 180,
//     convertedContacts: 32,
//   },
// ];

const campaignTypes = {
  pending: 'Aguardando Contato',
  billet_due: 'Boleto Vencendo',
  billet_expired: 'Boleto Vencido',
  follow_up: 'Acompanhamento'
};

function Campaigns() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [nameCampaign, setNameCampaign] = useState("");
  const [typeCampaign, setTypeCampaign] = useState("");

  // const [displayOrderCampaign, setDisplayOrderCampaign] = useState(0);
  const [paymentMethodCampaign, setPaymentMethodCampaign] = useState("");
  const [statusCampaign, setStatusCampaign] = useState("");
  // const [messageCampaign, setMessageCampaign] = useState("");

  // const [successMessage, setSuccessMessage] = useState<string | null>(null);


  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // const [filters] = useState([
  //   { paymentStatus: "pending" },
  //   { paymentStatus: "billet_due" },
  //   { paymentStatus: "billet_expired" },
  //   { paymentStatus: "follow_up" },
  // ]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call to save campaign
    setShowAddModal(false);
    setEditingCampaign(null);
  };

  const handleCampaignCreate = async () => {
    // setLoading(true);
    // setError(null);
    // setSuccessMessage(null);

    try {
      await createCampaign({
        name: nameCampaign,
        paymentMethod: paymentMethodCampaign,
        status: statusCampaign,
        type: typeCampaign,
        displayOrder: 0,
        message: ''
      });
      // setSuccessMessage("");
    } catch (err) {
      //   setError(err.message);
    } finally {
      //   setLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const campaigns = await getCampaigns();
      setCampaigns(campaigns);
    } catch (error: any) {
     // setError("Erro ao carregar os pedidos");
    } finally {
     // setLoading(false);
    }
  };

  

  const groupedCampaigns = campaigns.reduce((acc, campaign) => {
    if (!acc[campaign.type]) {
      acc[campaign.type] = [];
    }
    acc[campaign.type].push(campaign);
    return acc;
  }, {} as Record<string, Campaign[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Campanhas</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Campanha
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {Object.entries(campaignTypes).map(([type, label]) => (
          <div key={type} className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-700">{label}</h3>
            {(groupedCampaigns[type] || []).map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center flex-1   min-w-0">
                    <Megaphone className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0"  />
                    <h4 className="font-semibold truncate overflow-hidden whitespace-nowrap ">
                      {campaign.name}
                    </h4>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingCampaign(campaign)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-semibold">{campaign.total}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Convertidos</p>
                    <p className="font-semibold">{campaign.converted}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {(showAddModal || editingCampaign) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">
              {editingCampaign ? 'Editar Campanha' : 'Nova Campanha'}
            </h3>
            <form onSubmit={handleSaveCampaign}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome da Campanha
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingCampaign?.name}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => setNameCampaign(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de Campanha
                  </label>
                  <select
                    name="type"
                    defaultValue={editingCampaign?.type}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => setTypeCampaign(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {Object.entries(campaignTypes).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Método de Pagamento
                  </label>
                  <select
                    name="method_payment"
                    defaultValue={editingCampaign?.paymentMethod}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => setPaymentMethodCampaign(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="billet">Boleto</option>
                    <option value="credit_card">Cartão de crédito</option>
                    <option value="checkout_abandoned">Checkout abandonado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingCampaign?.status}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => setStatusCampaign(e.target.value)}
                  >
                    <option value="pending">Desativado</option>
                    <option value="active">Ativado</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCampaign(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleCampaignCreate}
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

export default Campaigns;