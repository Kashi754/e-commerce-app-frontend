import './addCart.css';

export function AddCart(props) {
  const {
    handleSubmit,
    qty,
    setQty,
    quantityInStock,
    productId,
    cartProducts
  } = props;

  return (
    <form className="add-cart-form" onSubmit={handleSubmit}>
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
            [...Array(quantityInStock + 1)].map((_, i) => {
              if (i !== 0) return (<option key={i} value={i}>{i}</option>)
            })
          }
        </select>
      </fieldset>
      <button type="submit" disabled={cartProducts.indexOf(productId) >= 0}>{cartProducts.indexOf(productId) < 0 ? 'Add to Cart' : 'Product Already In Cart'}</button>
    </form>
  );
}