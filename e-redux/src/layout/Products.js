import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react";
import axios from 'axios';
import './ProductList.css';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../AppContext';

export default function Products() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [product,setProduct] = useState({})
  const [product1,setProduct1] = useState({})
  const [getdata,setGetdata]=useState(false)
  const [image,setImage]=useState();


const{user}=useContext(AuthContext)


function togglegetdata() {
  if(getdata===false){
setGetdata(true)
  }else{
setGetdata(false)
  }
}

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8080/products");
      setData(response.data);
    }

    fetchData();
  }, [getdata]);

// console.log(user)

  const handleDelete = async (id) => {
    try {
    await axios.delete(`http://localhost:8080/product/${id}`);
    togglegetdata()
    } catch (error) {
      console.log(error)
    }
    // setData(data.filter(product => product.id !== id));
  };

  const handleUpdate = async (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleAddModal = () =>{
    setShowModal2(true)
  }
  
  const handleSave = async (updatedProduct) => {
  
  try {

    const data={
        name:name,
        type:type,
        price:price
    }
    setProduct({data})
     await axios.put(`http://localhost:8080/product/${currentProduct.id}`, data).then((res)=>{
console.log(res)

    });
   
    handleClose();
  } catch (error) {
    console.log(error)
  }
 
  };

  const [currentProduct, setCurrentProduct] = useState({});
  const [name, setName] = useState(currentProduct?.name);
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [name1, setName1] = useState(currentProduct?.name1);
  const [price1, setPrice1] = useState(0);
  const [type1, setType1] = useState("");

  const [filepic, setFilepic] = useState(null)



  const handleChange = (event) => {
    setCurrentProduct({
      ...currentProduct,
      [event.target.name]: event.target.value
    });
    console.log(currentProduct)
  };




  const handleClose = () => setShowModal(false);
  const handleClose2 = () => setShowModal2(false);


  const handleAdd =async() => {
    // Add your code here to handle the add product functionality
    try {

        const data={
            name:name1,
            type:type1,
            price:price1,
            image:image
        }
        setProduct1({data})
        await axios.post(`http://localhost:8080/product`, data).then((res)=>{
    console.log(res)
    
        });
       
        handleClose2(true);
        togglegetdata()
      } catch (error) {
        console.log(error)
      }
     
      };
 






  function handleopenwidget(){
  
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'ilyesoo7', 
      uploadPreset: 'xyplyxtc'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
  
          // setQuestionimage({url:result.info.url,public_id:result.info.public_id})
          setImage(result.info.url)
  
  
  
        }
      }
    )
    myWidget.open();
  }

  // console.log(image)


  return (
    <div className="container">
    <div className="header">
    <button variant="primary" className="add-button" onClick={() => handleAddModal()}>
    Ajouter Produit
  </button>
  </div>
    <div className="container-fluid product-list d-flex align-items-center">
       
      <h2 className="text-center m-5">Nos Produits</h2>
      
      <table className="table table-bordered bg-light">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>${product.price}</td>
              <td><img src={product?.image} style={{width: '50px', height: '50px'}} /></td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Supprimer</button>
                <button className="btn btn-primary" onClick={() => handleUpdate(product)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Produit</Modal.Title>
       

        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input type="text" className="form-control" id="name" placeholder={currentProduct.name}  onChange={(e)=>{setName(e.target.value)}} />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input type="text" className="form-control" id="type"  onChange={(e)=>{setType(e.target.value)}} />

            </div>
            <div className="form-group">
              <label htmlFor="price">Prix</label>
              <input type="number" className="form-control" id="price"  onChange={(e)=>{setPrice(e.target.value)}} />

            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Produit</Modal.Title>
       

        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input type="text" className="form-control" id="name"  onChange={(e)=>{setName1(e.target.value)}} />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input type="text" className="form-control" id="type"  onChange={(e)=>{setType1(e.target.value)}} />

            </div>
            <div className="form-group mb-4">
              <label htmlFor="price">Prix</label>
              <input type="number" className="form-control" id="price"  onChange={(e)=>{setPrice1(e.target.value)}} />

            </div>
            <div className='form-group'>
            {/* <input type="file" name="file" id="file" onChange={(e) => setFilepic(e.target.files[0])}/> */}
      <Button onClick={handleopenwidget}>Upload an image</Button>


            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleAdd}>Enregistrer</button>
        </Modal.Footer>
      </Modal>

    </div>
    </div>
  )}
