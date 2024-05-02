import React from 'react'
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import UpadteOrders from '../../Components/OrderDetails/UpdateOrders';
import Home from './Home'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/addproduct' element={<AddProduct />}/>
        <Route path='/listproduct' element={<ListProduct />}/>
        <Route path='/orders' element={<UpadteOrders />}/>
      </Routes>
    </div>
  )
}

export default Admin
