import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import FileToUpload from './components/upload/file-upload'
import Transactions from './components/transaction/transactions';


const router = createBrowserRouter([
  {
    path: '/upload',
    element: <FileToUpload />,
  },
  {
    path: '/',
    element: <Transactions />,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
