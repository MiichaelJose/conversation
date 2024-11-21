import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { 
  ShoppingCart, 
  Calendar, 
  GitBranch, 
  Mail, 
  Megaphone, 
  BarChart2, 
  Users,
  LogOut
} from 'lucide-react';

function Layout() {
  const logout = useAuthStore((state) => state.logout);
  
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-8">
          <NavLink
            to="/app/orders"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            Pedidos
          </NavLink>
          <NavLink
            to="/app/calendar"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <Calendar className="w-5 h-5 mr-3" />
            Agenda Google
          </NavLink>
          <NavLink
            to="/app/order-flow"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <GitBranch className="w-5 h-5 mr-3" />
            Fluxo de Pedidos
          </NavLink>
          <NavLink
            to="/app/emails"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <Mail className="w-5 h-5 mr-3" />
            Emails
          </NavLink>
          <NavLink
            to="/app/campaigns"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <Megaphone className="w-5 h-5 mr-3" />
            Campanhas
          </NavLink>
          <NavLink
            to="/app/reports"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            Relatórios
          </NavLink>
          <NavLink
            to="/app/users"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <Users className="w-5 h-5 mr-3" />
            Usuários
          </NavLink>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;