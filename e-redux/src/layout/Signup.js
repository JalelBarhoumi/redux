import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const Signin = () => {
    
    const navigate = useNavigate();
    
    const validationSchema = Yup.object({
        nom: Yup.string().required('Name is required'),
        prenom: Yup.string().required('Surname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const initialValues = {
    nom: '',
    prenom: '',
    email: '',
    password: ''
  };


  const handleSubmit = (values) => {
    try {
        axios.post('http://localhost:8080/user', values)
        .then((res) => {
          console.log(res);
        })
        navigate("/login");
    } catch (error) {
      console.log(error);
        
    }
 
  
};

  return (
    <div className="bg-image d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="bg-light p-5 form-large ">
            <h1 className="text-center mb-4">Creer un compte</h1>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <Field
                type="text"
                name="nom"
                id="nom"
                placeholder="Entrer votre nom"
                className={`form-control ${touched.nom && errors.nom ? 'is-invalid' : ''}`}
              />
              {touched.nom && errors.nom && (
                <div className="invalid-feedback">{errors.nom}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="prenom">Prenom</label>
              <Field
                type="text"
                name="prenom"
                id="prenom"
                placeholder="Entrer votre prenom"
                className={`form-control ${touched.prenom && errors.prenom ? 'is-invalid' : ''}`}
              />
              {touched.prenom && errors.prenom && (
                <div className="invalid-feedback">{errors.prenom}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Entrer votre email"
                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>

                        
                            <Field type="password" name="password" placeholder="Password" 
                             className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`} />
                           {touched.password && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
                        
                </div>
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            Submit
                        </button>
                        <div className=" text-right">
                          <a href='/login'>Connexion.</a>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );}

export default Signin