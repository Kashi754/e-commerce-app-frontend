import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, selectIsLoading, selectIsError, selectError, loadProductData } from "./productSlice";
import { selectUser } from "../user/userSlice";
import { addCartItem } from "../cart/cartSlice";
import { useLocation } from "react-router-dom";
import { AddCart } from "../../Components/addCart/AddCart";
import './product.css';
import { quantum } from "ldrs";
quantum.register();

export function Product() {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const location = useLocation;
  const [ quantity, setQuantity ] = useState(0);

  useEffect(() => {
    dispatch(loadProductData(location.pathname));
  }, [dispatch, location]);

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  function handleSubmit(e) {
    e.preventDefault();
    if (quantity > 0) {
      dispatch(addCartItem({
        cartId: user.cartId,
        productId: product.id,
        qty: quantity
      }));
  
      setQuantity(0);
    }
  }

  if(isLoading) {
    return (
      <div data-testid='loader' className="loader">
          {<l-quantum
              size={300}
              speed={1}
              color='#000000'
          />}
      </div>
    )
  }

  // if(isError) {
  //   return (
  //       <div className="error">
  //           <p role='alert'>{error}</p>
  //       </div>
  //   )
  // }

  return (
    <main className="product">
      <img src={`/images/products/${product.id}.jpg`} alt={product.name}/>
      <section className="product-infobox">
        <div className="product-info">
          <h4>{product.name}</h4>
          <h5>{product.price}</h5>
          <figure className="description">
            {product.description}
            <figcaption className="quantity">Quantity in stock: {product.qty_in_stock}</figcaption>
          </figure>
        </div>
        {
          product.qty_in_stock > 0 ? 
          <AddCart 
            handleSubmit={handleSubmit} 
            qty={quantity}
            setQty={setQuantity} 
            quantity={product.qty_in_stock} 
          /> :
          <h3 className="stock-shortage">Out of stock</h3>
        }
      </section>
    </main>
  )
}