import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectIsLoading, selectIsError, selectError, loadProductsData } from "./productsSlice";
import { Link, useLocation } from "react-router-dom";
import './products.css';
import { quantum } from "ldrs";
import formatMoney from "accounting-js/lib/formatMoney";
quantum.register();

export function Products() {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadProductsData(location.search));
  }, [dispatch, location.search]);

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
    <main className="products">
      {products.map(product => {
        return (
          <Link className="product-tile" key={product.id} to={`/products/${product.id}`}>
            <img src={`/images/products/${product.id}.jpg`} alt={product.name}/>
            <h4>{product.name}</h4>
            <h5>${formatMoney(product.price)}</h5>
          </Link>
        )
      })}
    </main>
  )
}