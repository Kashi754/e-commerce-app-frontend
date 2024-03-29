import formatMoney from 'accounting-js/lib/formatMoney';
import { quantum } from 'ldrs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './products.css';
import {
  loadProductsData,
  selectError,
  selectIsLoading,
  selectProducts,
} from './productsSlice';
import { addDefaultImg } from '../../utilities/addDefaultImage';
quantum.register();

export function Products() {
  const isLoading = useSelector(selectIsLoading);
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

  if (error) {
    console.error('Error %d: ' + error.message, error.status);
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
                  src={`${serverUrl}/assets/images/products/${product.image_file || product.id + '.jpg'}`}
                  alt={product.name}
                  onError={addDefaultImg}
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
