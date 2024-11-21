import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
// import { useAuthStore } from "../stores/authStore";

import Login from "../pages/login";
import Layout from "../components/Layout";
import GoogleCalendar from "../pages/googlecalendar";
import Emails from "../pages/email";
import Campaigns from "../pages/campaign";
import OrderFlow from "../pages/orderflow";
import Reports from "../pages/report";
import Orders from "../pages/order";
import Users from "../pages/user";

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

{/* <PrivateRoute>
        <Layout />
      </PrivateRoute> */}

const AppRoutes = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/login" element={<Login />} />,
    <Route path="app" element={
      <Layout />
    } >
      <Route path="orders" element={<Orders />}/>
      <Route path="calendar" element={<GoogleCalendar />} />
      <Route path="emails" element={<Emails />} />
      <Route path="campaigns" element={<Campaigns />} />
      <Route path="order-flow" element={<OrderFlow />} />
      <Route path="reports" element={<Reports />} />
      <Route path="users" element={<Users />} />
    </Route>,
  ]),
);

export default AppRoutes;
