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
      <button 
        className='add-item-button' 
        type="submit" 
        disabled={cartProducts.indexOf(productId) >= 0}
      >
        {cartProducts.indexOf(productId) < 0 ? 'Add to Cart' : 'Product Already In Cart'}
      </button>
      {
        cartProducts.indexOf(productId) >= 0 && 
        <button 
          className='remove-item-button' 
          type='button' 
          onClick={handleRemoveItem} 
        >
          Remove from cart?
        </button>
      }
    </form>
  );
}