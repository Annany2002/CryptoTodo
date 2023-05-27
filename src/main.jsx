import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 
  { createBrowserRouter,
    RouterProvider
  }
  from 'react-router-dom'
import Home from './pages/Home' 
import Crypto from './pages/Crypto' 
import Trending from './pages/Trending' 
import Saved from './pages/Saved' 
import CryptoDetails from './components/CryptoDetails'
import TrendingCoin from './components/TrendingCoin'
 

const router = createBrowserRouter([
{
  path:'/',
  element:<Home/>,
  children:[
    {
      path:'/',
      element:<Crypto/>,
      children:
      [
        {
          path:':coinId',
          element:<CryptoDetails/>,
          
        },
      ],
    },
    {
      path:'/trending',
      element:<Trending/>,
      children:[
      {
        path:':coinId',
        element:<CryptoDetails/>
      },
    ],
    },
    {
      path:'/saved',
      element:<Saved/>,
      children:[
      {
        path:':coinId',
        element:<CryptoDetails/>
      },
    ],
    },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
