import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectIsLoading, selectIsError, selectError, loadProductsData } from "./productsSlice";
import { Link } from "react-router-dom";
import './products.css';
import { quantum } from "ldrs";
quantum.register();

export function Products () {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsData());
  }, [dispatch]);

  if(isLoading) {
    return (
      <div data-testid='loader' className="loader">
          {<l-quantum
              size={300}
              speed={1}
              color='#ffffff'
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
    <main className="categories">
      {products.map(product => {
        return (
          <Link className="product-tile" key={product.id} to={`/products/${product.id}`}>
            <img src={`/images/categories/${product.id}.jpg`} alt={product.name}/>
            <h4>{product.name}</h4>
            <h5>{product.price}</h5>
          </Link>
        )
      })}
    </main>
  )
}