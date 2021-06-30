import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import {Search} from './Search';


const Home = () => {

    const [productsSE, setProductsSE] = useState([]);
    const [productsFE, setProductsFE] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() =>{
       loadproductsByDepartment(11);
       loadproductsByDepartment(22);
    }, []);

   

    const loadproductsByDepartment = (dept) => {
        var formData = new FormData();
        
        formData.append("department", dept);
        console.log("sending search request");

        fetch("http://localhost:80/admin_panel/home.php", {
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
            console.log(response); //[0]["first_name"]);

            if(dept === 11){
                setProductsFE(response["items"]);
            } else if(dept === 22){
                setProductsSE(response["items"])
            }
          });
      }


    return(
        <Layout title="Home" description="Home page of the website" className="container-fluid">
            <div>
                <Search/>
            </div>
            <div className="row">
                <h2 className="mb-2 mx-auto">First Year</h2>
                
            </div>
            <div className="row fluid detail-parent p-5">
                {productsFE.map((product, i) =>(<Card key={i} product={product} />))}
            </div>
            <hr/>
            <div className="row">
                <h2 className="mb-2 fluid mx-auto">Second Year</h2>
            </div>
            <div className="row detail-parent p-5">
            {productsSE.map((product, i) =>(<Card key={i} product={product}/>))}
            </div>
        </Layout>
    );
};

export default Home;