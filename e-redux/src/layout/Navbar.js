import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import './ProductList.css';
import { PanierContext } from '../PanierContext';
import { AuthContext } from '../AppContext';
import axios from 'axios';



export default function Navbar({total,setTotal}) {

    const {} =useContext(AuthContext)

    const SavePanier =async() => {
        
        try {
            const data={
                total:total,
                userId:localStorage.getItem('user'),
                produits:realproducts
            }
         
            await axios.post(`http://localhost:8080/basket`, data).then((res)=>{ });
           
            handleClose(true);
          } catch (error) {
            console.log(error)
          }
         
          };


const {panierproducts,setPanierproducts} =useContext(PanierContext);
const [realproducts,setRealproducts]=useState([])
const array=panierproducts?.slice(1)

const handleOpenPanier = () =>{
        setShowModal(true)
    setRealproducts(array)  
    }

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

const navigate = useNavigate()

const handleClick = () => {
        navigate("/login");
    };    


function removeproduct(id){
        setRealproducts(prevProducts => prevProducts.filter(product => product.id !== id))
        setPanierproducts(prevProducts => prevProducts.filter(product => product.id !== id))
        
    }    
  function handleChange(id, direction) {
    const updatedProducts = realproducts.map(product => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + direction };
      }
      return product;
    });
    setRealproducts(updatedProducts);
  }

  function calculateTotal() {
    let newTotal = 0;
    realproducts.forEach(product => {
      newTotal += product.price * product.quantity;
    });
    setTotal(newTotal);
  }

  useEffect(() => {
    calculateTotal();
  }, [realproducts]);
  const handleClick1 = () => {
    navigate("/products");
};

    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" style={{ color: 'red',fontWeight: 'bold' }}>
                        <FontAwesomeIcon icon={faShoppingCart} /> E-Redux
                    </a>
                    <form className="d-flex" role="search">
                    <button className="btn btn-success " type="button" onClick={handleClick1}>
                            <FontAwesomeIcon icon={faShoppingCart} />Nos Produits
                        </button>
                        <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-danger mx-2" type="button" onClick={handleOpenPanier}>
                            <FontAwesomeIcon icon={faShoppingBasket} />
                        </button>
                        <button className="btn btn-success" type="button" onClick={handleClick}>
                            <FontAwesomeIcon icon={faSignInAlt} /> Connexion
                        </button>
                    </form>
                    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Votre Panier</Modal.Title>
       

        </Modal.Header>
        <Modal.Body>
        <table className="table table-bordered bg-light">
        <thead>
          <tr>
          <th></th>
            <th>Nom</th>
            <th>Type</th>
            <th>Prix</th>
            <th></th>
            <th></th>

           
          
          </tr>
        </thead>
        <tbody>
          {realproducts?.map(product => (
            
            <tr key={product.id}>
              <td><img src={product?.image} style={{width: '50px', height: '50px'}}/></td>

              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>${product.price}</td>
             
                <ul>
        
                <button  className="btn btn-warning"onClick={() => handleChange(product.id, -1)}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                    {product.quantity}
                <button className="btn btn-warning" onClick={() => handleChange(product.id, 1)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
          
    
      </ul>
      <td>
              <button  className="btn btn-danger" onClick={()=>{removeproduct(product.id)}}>X</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total: {total}</h2>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={SavePanier}>Enregistrer</button>
        </Modal.Footer>
      </Modal>
                </div>
            </nav>
        </div>
    )
}
