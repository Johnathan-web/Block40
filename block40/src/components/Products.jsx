
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
const getProductInfo = (id) => {
  navigate(`/products/${id}`)
}
const getProducts = async() => {
    const response = await fetch('http://localhost:3000/api/v1/products');
    const result = await response.json();
    console.log(result);
    setProducts(result);
}

useEffect(()=>{
    getProducts()
},[])

  return (
    <div>
    {products && (
        products.map((product)=> (
            <div key={product.id}>
                <h1>{product.name}</h1>
                <button onClick={()=>getProductInfo(product.id)}>details</button>
            </div>
        ))
    )}  
    </div>
    
  );
};

export default Products;