// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
 
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

// const chartData = [
//   { method: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

import { Users } from 'lucide-react';
import { useEffect, useState } from "react";
import { getReports } from "@/shared/services/Campaign copy";

interface UserReport {
  seller: string,
  data: [
    {
      payment_method: string,
      available: string,
      contacted: string,
      converted: string,
      conversation_percentage: string
    }
  ]
}

// const mockReports: UserReport[] = [
//   {
//     id: '1',
//     name: 'João Silva',
//     totalOrders: 150,
//     contacts: 300,
//     converted: 120,
//     paymentMethods: {
//       card: 80,
//       pix: 25,
//       boleto: 15,
//     },
//     abandonedCheckouts: 30,
//   },
//   {
//     id: '2',
//     name: 'Maria Santos',
//     totalOrders: 200,
//     contacts: 450,
//     converted: 180,
//     paymentMethods: {
//       card: 100,
//       pix: 50,
//       boleto: 30,
//     },
//     abandonedCheckouts: 40,
//   },
// ];

export default function Reports() {
  const [reports, setReports] = useState<UserReport[]>([])

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports= async () => {
    try {
      const reports = await getReports("18");
      setReports(reports);
    } catch (error: any) {
     // setError("Erro ao carregar os pedidos");
    } finally {
     // setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Relatórios</h2>

      {reports.map((report) => (
        <div
          key={report.contacted}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold">{report.seller}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total de Pedidos</p>
              <p className="text-2xl font-bold text-blue-600">
                {report.data[0].available}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Contatos</p>
              <p className="text-2xl font-bold text-green-600">
                {report.data[0].available}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Convertidos</p>
              <p className="text-2xl font-bold text-purple-600">
                {report.data[0].available}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Abandonados</p>
              <p className="text-2xl font-bold text-red-600">
                {report.data[0].available}
              </p>
            </div>
          </div>

          <div className="h-80 w-full">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={report.data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="payment_method"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
      </BarChart>
    </ChartContainer>
            {/* <ResponsiveContainer width="100%" height="100%">
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
            </ResponsiveContainer> */}
          </div>
        </div>
      ))}
    </div>
  );
}