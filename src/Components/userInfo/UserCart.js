import { Link } from "react-router-dom";
import { selectQty, selectPrice } from "../../Pages/cart/cartSlice";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import './userCart.css';
import formatMoney from "accounting-js/lib/formatMoney";

export function UserCart() {
  const cartQuantity = useSelector(selectQty);
  const cartPrice = useSelector(selectPrice);

  return (
    <Link className="user-cart" to={'/cart'}>
      <h3 className="price">{formatMoney(cartPrice)}</h3>
      <h4 className="cart-qty">{cartQuantity}</h4>
      <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
    </Link>
  );
}