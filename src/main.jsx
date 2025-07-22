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


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="max-w-7xl mx-auto">
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" reverseOrder={false} />
          </AuthProvider>
        </div>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
);

