import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Users } from 'lucide-react';

interface GoogleCalendar {
  id: string;
  name: string;
  email: string;
  contactCount: number;
  flowCount: number;
  assignedTo: string | null;
  telephone: string;
}

interface User {
  id: string;
  name: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Santos' },
];

const mockCalendars: GoogleCalendar[] = [
  {
    id: '1',
    name: 'Vendas Principal',
    email: 'vendas@company.com',
    contactCount: 150,
    flowCount: 3,
    assignedTo: 'João Silva',
    telephone: '5511999999999',
  },
  {
    id: '2',
    name: 'Suporte',
    email: 'suporte@company.com',
    contactCount: 89,
    flowCount: 2,
    assignedTo: null,
    telephone: '5511888888888',
  },
];

export default function GoogleCalendar() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCalendar, setEditingCalendar] = useState<GoogleCalendar | null>(null);

  const handleGoogleAuth = async () => {
    try {
      // In real implementation, redirect to Google OAuth flow
      window.location.href = '/api/auth/google';
    } catch (error) {
      console.error('Error during Google authentication:', error);
    }
  };

  const handleSaveCalendar = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call to save calendar
    setShowAddModal(false);
    setEditingCalendar(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Agendas Google</h2>
        <button
          onClick={handleGoogleAuth}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Conectar Agenda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCalendars.map((calendar) => (
          <div
            key={calendar.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-lg">{calendar.name}</h3>
                  <p className="text-gray-600 text-sm">{calendar.email}</p>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Contatos:</span>
                <span className="font-semibold">{calendar.contactCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fluxos:</span>
                <span className="font-semibold">{calendar.flowCount}</span>
              </div>
              {calendar.assignedTo ? (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vendedor:</span>
                  <span className="font-semibold">{calendar.assignedTo}</span>
                </div>
              ) : (
                <button
                  onClick={() => setEditingCalendar(calendar)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Definir Vendedor
                </button>
              )}
              <button
                onClick={() => setEditingCalendar(calendar)}
                className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              >
                Editar Agenda
              </button>
            </div>
          </div>
        ))}
      </div>

      {(showAddModal || editingCalendar) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">
              {editingCalendar ? 'Editar Agenda' : 'Nova Agenda'}
            </h3>
            <form onSubmit={handleSaveCalendar}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCalendar?.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Telefone (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    defaultValue={editingCalendar?.telephone}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={editingCalendar?.email}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Operador da Agenda
                  </label>
                  <select
                    defaultValue={editingCalendar?.assignedTo || ''}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Selecione um operador</option>
                    {mockUsers.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCalendar(null);
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