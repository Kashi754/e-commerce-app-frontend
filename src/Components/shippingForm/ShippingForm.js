import formatMoney from 'accounting-js/lib/formatMoney';
import { useDispatch } from 'react-redux';
import './shippingForm.css';

export function ShippingForm(props) {
  const { shippingInfo, selectedShippingInfo, setSelectedShippingInfo } = props;

  const dispatch = useDispatch();

  return (
    <form className='shipping-form'>
      <h2>Shipping Options</h2>
      <ul className='shipping-options'>
        {shippingInfo.map((item) => {
          return (
            <li key={item.serviceType}>
              <input
                type='radio'
                id={item.serviceType}
                name='shipmentType'
                value={item.serviceType}
                key={item.serviceType}
                checked={selectedShippingInfo.serviceType === item.serviceType}
                onChange={(e) =>
                  dispatch(
                    setSelectedShippingInfo(
                      shippingInfo.find(
                        (info) => info.serviceType === e.target.value
                      )
                    )
                  )
                }
              />
              <label htmlFor='{item.serviceType}'>
                <h5>{item.serviceName}</h5>
                <h6>
                  {item.transitDays} | {formatMoney(item.totalCharge)}
                </h6>
              </label>
            </li>
          );
        })}
      </ul>
    </form>
  );
}
