import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, selectIsLoading, selectIsError, selectError, loadProductData } from "./productSlice";
import { selectCart } from "../cart/cartSlice";
import { addCartItem } from "../cart/cartSlice";
import { useLocation } from "react-router-dom";
import { AddCart } from "../../Components/addCart/AddCart";
import './product.css';
import { quantum } from "ldrs";
quantum.register();

export function Product() {
  const cart = useSelector(selectCart);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const location = useLocation();
  const [ quantity, setQuantity ] = useState(1);
  const cartProducts = cart.map(product => product.id);

  useEffect(() => {
    dispatch(loadProductData(location.pathname));
  }, [dispatch, location]);

  function handleSubmit(e) {
    e.preventDefault();
    if (quantity > 0) {
      dispatch(addCartItem({
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
          <h5>{`${product.price}`}</h5>
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
            quantityInStock={product.qty_in_stock}
            productId = {product.id}
            cartProducts={cartProducts}
          /> :
          <h3 className="stock-shortage">Out of stock</h3>
        }
      </section>
    </main>
  )
}