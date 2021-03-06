import React, { useState, useEffect, useDebugValue } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct, getCategories} from './apiAdmin';

export const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo1: '',
        photo2: '',
        photo3: '',
        photo4: '',
        details: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: '',
        formData: ''
    });

    //get categories and set form data

    const init = () => {
        getCategories()
        .then((data) => {
            if(data.error){
                setValues({...values, error: data.error});
            } else{
                setValues({...values, categories: data, formData: new FormData()});
            }
        })
    };


    useEffect(() => {
        init();
    }, []);
    
    const {user, token} = isAuthenticated();

    const{
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        // photo1,
        // photo2,
        // photo3,
        // photo4,
        details,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading: true, error: ''});

        createProduct(user._id, token, formData)
        .then((data) => {
            if(data.error){
                setValues({...values, error: data.error, loading: false});
            } else{
                setValues({
                    name: '',
                    description: '',
                    price: '',
                    categories: [],
                    category: '',
                    shipping: '',
                    quantity: '',
                    photo1: '',
                    photo2: '',
                    photo3: '',
                    photo4: '',
                    details: '',
                    loading: false,
                    error: '',
                    createdProduct: data.name,
                    redirectToProfile: '',
                    formData: ''
                })
            }
        })
    };

    const newPostForm = () => {
        return(
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo #1</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" onChange={handleChange('photo1')} name="photo1" accept="image/*"></input>
                </label> 
            </div>

            <h4>Post Photo #2</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" onChange={handleChange('photo2')} name="photo2" accept="image/*"></input>
                </label> 
            </div>

            <h4>Post Photo #3</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" onChange={handleChange('photo3')} name="photo3" accept="image/*"></input>
                </label> 
            </div>

            <h4>Post Photo #4</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" onChange={handleChange('photo4')} name="photo4" accept="image/*"></input>
                </label> 
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea type="text" onChange={handleChange('description')} className="form-control" value={description}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="text" onChange={handleChange('price')} className="form-control" value={price}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Select</option>
                    {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="text" onChange={handleChange('quantity')} className="form-control" value={quantity}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Details</label>
                <input type="text" onChange={handleChange('details')} className="form-control" value={details}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <button className="btn btn-outline-primary">Submit</button>
        </form>
        );
    };


    const handleChange = (fieldName) =>{ // higher order function
        return ((event) => {
            
            let value;
            
            if(fieldName === 'photo1' || fieldName === 'photo2' || fieldName === 'photo3'  || fieldName === 'photo4' ){
                value = event.target.files[0];
            } else {
                value = event.target.value;
            }
            formData.set(fieldName, value);
            setValues({...values,[fieldName]: value});
        });
    }

    const showSuccess = () => {
        if(createdProduct){
            return <h3 className="text-success">Product {createdProduct} Created</h3>
        }
    };

    const showError = () => {
        if(error){
            return <h5 className="text-danger">Product {name} could not be created</h5>
        }
    };

   const showLoading = () => {
       return(loading &&
           <div className="alert alert-success">
               <h3>Loading ...</h3>
           </div>
       );
   };
    
    
    return(
        <Layout title="Add Product" description="Add a new product for sale">

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};