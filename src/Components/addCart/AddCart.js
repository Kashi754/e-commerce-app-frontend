import './addCart.css';

export function AddCart(props) {
  const {
    handleSubmit,
    qty,
    setQty,
    quantity
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
        >
          {
            [...Array(quantity + 1)].map((_, i) => {
              return <option key={i} value={i}>{i}</option>
            })
          }
        </select>
      </fieldset>
      <button type="submit" >Add to Cart</button>
    </form>
  );
}