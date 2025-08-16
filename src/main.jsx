import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { CartProvider } from './contexts/CartContext.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51RgDIkRaKoptteqIzaWvU7A53x8ReucjmtXEOBcwtSMqk8OMxXlQLBo0fjH1AWXpWvbOd3IfgqajhjpTFqybbV2100rSFSVcFv');
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <RouterProvider router={router} />
          </Elements>
        </CartProvider>
      </AuthProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  </StrictMode>
);

