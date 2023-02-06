import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AppContext';
import './ProductList.css';

const Login = () => {

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const {user,setUser}=useContext(AuthContext)

const navigate=useNavigate()

    const handleSubmit = async () => {
        try {
            axios.post(`http://localhost:8080/user/${email}/${password}`)
            .then((res) => {
              if (res.data==="Email doesn't exist") {
              console.log(res.data);
                
              }
              if(res.data==="Wrong password"){
                console.log(res.data);

              } else {
                setUser(res.data)
                localStorage.setItem('user', res.data.id);
                navigate('/')
              }
            })
            // navigate("/login");
        } catch (error) {
          console.log(error);
            
        }
     
      
    };
    // console.log(user)


    return (
        <div className="bg-image d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="bg-light p-5" style={{ width: '400px', borderRadius: '20px' }}>
                <h1 className="text-center mb-4">Login</h1>
                {/* <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Prenom</label>
                    <input type="text" className="form-control" id="surname" placeholder="Enter your surname"></input>
                </div> */}
                <div className="form-group">
                    <label htmlFor="email">Adresse email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrer votre email" onChange={(e)=>{setEmail(e.target.value)
                    }} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" id="password" placeholder="entrer votre Mot de passe" onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <button className="btn btn-primary btn-block mb-2" onClick={handleSubmit }>Login</button>
                <div className="text-center">
                    <a href='/signup'>Ou, creer un comptet.</a>
                </div>
            </div>

        </div>
    )
}

export default Login
