import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import FileToUpload from './components/upload/file-upload'
import Transactions from './components/transaction/transactions';
import ProductorFinalBalance from './components/productor-final-balance/productor-final-balance';
import AffiliateFinalBalance from './components/affiliate-final-balance/affiliate-final-balance';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Transactions />,
  },
  {
    path: '/upload',
    element: <FileToUpload />,
  },
  {
    path: '/balance-productor',
    element: <ProductorFinalBalance/>,
  },
  {
    path: '/balance-affiliate',
    element: <AffiliateFinalBalance />,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
