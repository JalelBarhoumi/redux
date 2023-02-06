import './App.css';
import React, { useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from './layout/Navbar';
import ProductList from './layout/ProductList';
import image from "./assets/background.jpg"; 
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Products from './layout/Products';
import Login from './layout/Login';
import Signin from './layout/Signup';
import  { AuthContext } from './AppContext';
import { PanierContext } from './PanierContext';

function App() {
  
const [user,setUser]= useState({})
const [panierproducts,setPanierproducts]= useState([])



const [total, setTotal] = useState(0);

  return (
    <AuthContext.Provider value={{user,setUser}} >
      <PanierContext.Provider value={{panierproducts,setPanierproducts}}>
    <div className="App">
    <Router>
  <Routes>
    <Route path="/signup" element={<Signin />} />
    <Route path="/" element={
      <>
        <Navbar total={total} setTotal={setTotal}/>
        <ProductList />
      </>
    } />

    <Route path="/login" element={<Login />} />
    <Route path="/products" element={<Products />} />
  </Routes>
</Router>
     
{/* <Navbar/> */}
      {/* <ProductList/> */}
      {/* <Products/> */}
      {/* <Login/> */}
      {/* <Signin/> */}  

      
      
     
    </div>
    </PanierContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
