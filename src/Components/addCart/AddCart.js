import { useNavigate } from 'react-router';
import './addCart.css';

export function AddCart(props) {
  const {
    handleSubmit,
    handleRemoveItem,
    qty,
    setQty,
    quantityInStock,
    productId,
    cartProducts
  } = props;

  const navigate = useNavigate();

  return (
    <form className="add-cart-form" onSubmit={handleSubmit}>
      {
        cartProducts.indexOf(productId) === -1 && 
        <fieldset>
          <label htmlFor="qty">Qty:</label>
          <select 
            id="qty" 
            name="qty" 
            value={qty} 
            onChange={e => setQty(e.target.value)}
            disabled={cartProducts.indexOf(productId) >= 0}
          >
            {
              [...Array(quantityInStock)].map((_, i) => {
                return (<option key={i} value={i + 1}>{i + 1}</option>)
              })
            }
          </select>
        </fieldset>
      }
      { cartProducts.indexOf(productId) < 0 ?
        <button 
          className='add-item-button' 
          type="submit" 
        >
          Add to Cart
        </button> :
        <button
          className='add-item-button'
          type='button'
          onClick={handleRemoveItem}
        >
          Remove from Cart
        </button>

      }
      {
        cartProducts.indexOf(productId) >= 0 && 
        <button 
          className='checkout-link' 
          type='button' 
          onClick={() => navigate('/checkout/shipping')} 
        >
          Go to Checkout?
        </button>
      }
    </form>
  );
}