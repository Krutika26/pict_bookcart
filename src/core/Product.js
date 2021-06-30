import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import {Search} from './Search';
import {readProduct} from './apiCore';
import {ShowImage} from './showImage';
import '../styles.css';
import {DetailsThumb} from '../components/Thumbs';

export const ProductPage = (props) => {

    const [error, setError] = useState(false);
    const [product, setProduct] = useState({});
    const [imgNum, setImgNum] = useState(0);
    const imgNums = [1,2,3,4];
    

    const loadSingleProduct = (productId) => {
        var formData = new FormData();
        formData.append("productId", productId);
        console.log("sending search request");
        fetch("http://localhost:80/admin_panel/singleProduct.php", {
          method: "POST",
          headers: {
            // Accept: "application/json",
            // "Content-type": "application/json",
          },
    
          body: formData,
        })
          .then((res) => res.json())
          .then((response) => {
            console.log("response: ");
            console.log(response["items"][0]); //[0]["first_name"]);
            setProduct(response["items"][0]);
          });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        console.log(productId);
        loadSingleProduct(productId);
       
    }, []);

   


    return(
        <Layout title={product.item_name} description={product && product.description && product.description.substring(0,100)} className="container-fluid">

            <div className="detail-parent">
                <div className="details" key={product._id}>
                    <div className="big-img">
                        <ShowImage myStyling="view-product-img" url={product.image}/>
                    </div>

                    <div className="box">
                        <div>
                            <h2>{product.item_name}</h2>
                            <h5>{product.author}, {product.publication}</h5>
                            <hr/>
                            <span>₹{product.price}</span>
                        </div> 
                        <hr/> 
                        <button className="cart">Add to cart</button>
                        <button className="cart" onClick={() => {console.log(product)}}>Buy-now</button>
                        <hr/>
                        <br/>
                        <p>Description: {product.description}</p>
                        <hr/>
                        <p>Condition: {product.item_condition}</p>
                        <hr/>
                        <p>Seller: {product.seller}</p>
                    </div>
                    
                </div>
                
            </div>

           {JSON.stringify(product)}
        </Layout>
    );

};