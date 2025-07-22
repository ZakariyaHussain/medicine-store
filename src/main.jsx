// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import {RouterProvider} from "react-router";
// import { router } from './router/router.jsx';
// import AuthProvider from './contexts/AuthProvider.jsx';
// import { Toaster } from 'react-hot-toast';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <div className='max-w-7xl mx-auto'>
//       <AuthProvider>
//         <RouterProvider router={router} />
//         <Toaster position='top-right' reverseOrder={false}></Toaster>
//       </AuthProvider>
//     </div>
//   </StrictMode>,
// )

// new with tanstack query

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import { RouterProvider } from 'react-router';
// import { router } from './router/router.jsx';
// import AuthProvider from './contexts/AuthProvider.jsx';
// import { Toaster } from 'react-hot-toast';

// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query';

// // Create a client instance
// const queryClient = new QueryClient();

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* Provide QueryClient to the app */}
//     <QueryClientProvider client={queryClient}>
//       <div className="max-w-7xl mx-auto">
//         <AuthProvider>
//           <RouterProvider router={router} />
//           <Toaster position="top-right" reverseOrder={false} />
//         </AuthProvider>
//       </div>
//     </QueryClientProvider>
//   </StrictMode>
// );

//new with CartContext
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
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


const queryClient = new QueryClient();
const stripePromise = loadStripe('pk_test_51RgDIkRaKoptteqIzaWvU7A53x8ReucjmtXEOBcwtSMqk8OMxXlQLBo0fjH1AWXpWvbOd3IfgqajhjpTFqybbV2100rSFSVcFv');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <div className="max-w-7xl mx-auto">
        <AuthProvider>
          <CartProvider>
            <Elements stripe={stripePromise}>
              <RouterProvider router={router} />
              <Toaster position="top-right" reverseOrder={false} />
            </Elements>
          </CartProvider>
        </AuthProvider>
      </div>

    </QueryClientProvider>
  </StrictMode>
);

