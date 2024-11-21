import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Users } from 'lucide-react';

interface UserReport {
  id: string;
  name: string;
  totalOrders: number;
  contacts: number;
  converted: number;
  paymentMethods: {
    card: number;
    pix: number;
    boleto: number;
  };
  abandonedCheckouts: number;
}

const mockReports: UserReport[] = [
  {
    id: '1',
    name: 'João Silva',
    totalOrders: 150,
    contacts: 300,
    converted: 120,
    paymentMethods: {
      card: 80,
      pix: 25,
      boleto: 15,
    },
    abandonedCheckouts: 30,
  },
  {
    id: '2',
    name: 'Maria Santos',
    totalOrders: 200,
    contacts: 450,
    converted: 180,
    paymentMethods: {
      card: 100,
      pix: 50,
      boleto: 30,
    },
    abandonedCheckouts: 40,
  },
];

export default function Reports() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Relatórios</h2>

      {mockReports.map((report) => (
        <div
          key={report.id}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold">{report.name}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total de Pedidos</p>
              <p className="text-2xl font-bold text-blue-600">
                {report.totalOrders}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Contatos</p>
              <p className="text-2xl font-bold text-green-600">
                {report.contacts}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Convertidos</p>
              <p className="text-2xl font-bold text-purple-600">
                {report.converted}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Abandonados</p>
              <p className="text-2xl font-bold text-red-600">
                {report.abandonedCheckouts}
              </p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: 'Cartão',
                    value: report.paymentMethods.card,
                  },
                  {
                    name: 'PIX',
                    value: report.paymentMethods.pix,
                  },
                  {
                    name: 'Boleto',
                    value: report.paymentMethods.boleto,
                  },
                ]}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}