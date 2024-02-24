import formatMoney from 'accounting-js/lib/formatMoney';
import { quantum } from 'ldrs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './products.css';
import {
  loadProductsData,
  selectError,
  selectIsError,
  selectIsLoading,
  selectProducts,
} from './productsSlice';
quantum.register();

export function Products() {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const location = useLocation();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    dispatch(loadProductsData(location.search));
  }, [dispatch, location.search]);

  if (isLoading) {
    return (
      <div
        data-testid='loader'
        className='loader'
      >
        {
          <l-quantum
            size={300}
            speed={1}
            color='#000000'
          />
        }
      </div>
    );
  }

  if (isError) {
    console.error(error);
  }

  return (
    <main className='products-page'>
      <section className='products'>
        {products
          .filter((product) => product.qty_in_stock > 0)
          .map((product) => {
            return (
              <Link
                className='product-tile'
                key={product.id}
                to={`/products/${product.id}`}
              >
                <img
                  src={`http://${serverUrl}/assets/images/products/${product.image_file || product.id + '.jpg'}`}
                  alt={product.name}
                />
                <h4>{product.name}</h4>
                <h5>{formatMoney(product.price)}</h5>
              </Link>
            );
          })}
      </section>
    </main>
  );
}
