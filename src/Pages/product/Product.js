import { quantum } from 'ldrs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AddCart } from '../../Components/addCart/AddCart';
import { addCartItem, selectCart, deleteCartItem } from '../cart/cartSlice';
import './product.css';
import {
  loadProductData,
  selectError,
  selectIsLoading,
  selectProduct,
} from './productSlice';
import formatMoney from 'accounting-js/lib/formatMoney';
import { addDefaultImg } from '../../utilities/addDefaultImage';
quantum.register();

export function Product() {
  const cart = useSelector(selectCart);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const cartProducts = cart.map((product) => product.id);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    dispatch(loadProductData(location.pathname));
  }, [dispatch, location]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      addCartItem({
        productId: product.id,
        qty: quantity,
      })
    );
    setQuantity(1);
  }

  function handleRemoveItem(e) {
    e.preventDefault();
    dispatch(deleteCartItem(product.id));
  }

  if (error) {
    console.error('Error %d: ' + error.message, error.status);
  }

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

  return (
    <main className='product'>
      <div className='product-container'>
        {(product.image_file || product.id) && (
          <img
            src={`${serverUrl}/assets/images/products/${product.image_file || product.id + '.jpg'}`}
            alt={product.name}
            onError={addDefaultImg}
          />
        )}
        <section className='product-infobox'>
          <div className='product-info'>
            <h4>{product.name}</h4>
            <h5>{`${formatMoney(product.price)}`}</h5>
            <figure className='description'>
              {product.description}
              <figcaption className='quantity'>
                Quantity in stock: {product.qty_in_stock}
              </figcaption>
            </figure>
          </div>
          {product.qty_in_stock > 0 ? (
            <AddCart
              handleSubmit={handleSubmit}
              handleRemoveItem={handleRemoveItem}
              qty={quantity}
              setQty={setQuantity}
              quantityInStock={product.qty_in_stock}
              productId={product.id}
              cartProducts={cartProducts}
            />
          ) : (
            <h3 className='stock-shortage'>Out of stock</h3>
          )}
        </section>
      </div>
    </main>
  );
}
