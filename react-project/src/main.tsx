import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import FileToUpload from './components/upload/file-upload'
import NavBar from './components/nav/nav-bar';


const router = createBrowserRouter([
  {
    path: '/upload',
    element: <FileToUpload />,
  },
  {
    path: '/',
    element: <NavBar />,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
