import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react";
import axios from 'axios';
import './ProductList.css';
import Modal from 'react-bootstrap/Modal';
import { PanierContext } from '../PanierContext';




export default function ProductList() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const {panierproducts,setPanierproducts} =useContext(PanierContext);


  // function addToPanier(product) {
  
  // }
console.log('array')
console.log(panierproducts)

  const handleClose = () => setShowModal(false);

  
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8080/products");
      setData(response.data);

      // Get unique categories
      const categories = Array.from(new Set(response.data.map(product => product.type)));
      setCategories(categories);
    }

    fetchData();
  }, []);

const [added,setAdded]=useState(false)

function toggleAdded(){
  if(added===false){
setAdded(true)
handleClose()
  }else{
setAdded(false)
handleClose()
  }
}

  useEffect(() => {
    if(currentProduct?.name!==null){

      setPanierproducts([...panierproducts,currentProduct])
    }
    // setPanierproducts(prevState => [...prevState, currentProduct]);
  }, [added]);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };


  const handleShow = async (product) => {

        setCurrentProduct(product);
        
 
    console.log('hi')
    setShowModal(true);
  };


  return (
    <div className="container-fluid bg-image product-list d-flex align-items-center">
    <div className="row w-100 m-0">
      <div className="col-sm-3 category-list p-5">
        {categories?.map(category => (
          <div className={`category ${selectedCategory === category ? 'selected' : ''}`} key={category} onClick={() => handleCategorySelection(category)}>
            {category}
          </div>
        ))}
      </div>
      <div className="col-sm-9 product-grid p-5">
        <div className="row">
          {data?.filter(product => !selectedCategory || product.type === selectedCategory).map(product => (
            <div className="col-sm-2 col-md-2 mb-3" key={product.id}>
               <div className="card" style={{width: '150px', height: '350px', overflow: 'hidden'}}>
            <img src={product?.image} alt="product" className="card-img-top" style={{width: '150px', height: '150px', objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.type}</p>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-warning btn-sm" onClick={() => handleShow(product)} style={{width: '100%', padding: '5px 10px'}}>Afficher Produit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Afficher Produit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
            <img src={currentProduct?.image} alt="product" className="card-img-top" style={{ width: '200px', height: '200px' }} />
              <div className="card-body">
                <h5 className="card-title">{currentProduct.name}</h5>
                <p className="card-text">Type: {currentProduct.type}</p>
                <p className="card-text">Prix: ${currentProduct.price}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button   className="btn btn-primary" onClick={toggleAdded}>Ajouter au panier</button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
    </div>
  
    
  )
}
