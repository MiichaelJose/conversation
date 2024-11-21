import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes';
import { RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={AppRoutes} />
  </StrictMode>
);
