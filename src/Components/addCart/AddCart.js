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
            [...Array(quantityInStock)].map((_, i) => {
              return (<option key={i} value={i + 1}>{i + 1}</option>)
            })
          }
        </select>
      </fieldset>
      <button type="submit" disabled={cartProducts.indexOf(productId) >= 0}>{cartProducts.indexOf(productId) < 0 ? 'Add to Cart' : 'Product Already In Cart'}</button>
    </form>
  );
}