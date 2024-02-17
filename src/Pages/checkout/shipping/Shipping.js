import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { determineShippingServicesAndTransitTimes, selectAccessToken, selectAddress, selectSelectedShippingInfo, selectShippingInfo, setAccessToken, setAddress, toggleResidential, setSelectedShippingInfo, selectIsLoading, selectIsError, selectError } from './shippingSlice';
import { selectCart, selectPrice, selectWeight } from '../../cart/cartSlice';
import { AddressForm } from '@lob/react-address-autocomplete';
import VerificationResult from '../../../Components/shippingForm/VerificationResult';
import { useNavigate } from 'react-router';
import { ShippingForm } from '../../../Components/shippingForm/ShippingForm';
import './shipping.css';
import { patchApi } from '../../../utilities/fetchApi';

export function Shipping() {
  const accessToken = useSelector(selectAccessToken);
  const cartPrice = useSelector(selectPrice);
  const cartWeight = useSelector(selectWeight);
  const shippingInfo = useSelector(selectShippingInfo);
  const selectedShippingInfo = useSelector(selectSelectedShippingInfo);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ fieldsVerified, setFieldsVerified ] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [verificationResult, setVerificationResult] = useState({deliverability: ''});
  const [errorMessage, setErrorMessage] = useState(null);
  const { residential, ...address } = useSelector(selectAddress);

  async function fetchApiToken() {
    const response = await fetch('http://localhost:5000/cart/shipping', {
      method: "GET",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(!response.ok) {
      const error = await response.json();
      throw error;
    }
    const data = await response.json();
    const token = JSON.stringify(data);
    
    localStorage.setItem('fedexToken', token);
  }

  function verifyAllFields(address) {
    const {
      city,
      primary_line,
      state,
      zip_code
    } = address;

    if(!primary_line || zip_code.length < 5) {
      return setFieldsVerified(false);
    }

    if(!city || !state) {
      if(primary_line !== 'deliverable' || zip_code !== '11111') {
        return setFieldsVerified(false);
      }
      return setFieldsVerified(true);
    }

    if(validator.isPostalCode(zip_code, 'US')) {
      return setFieldsVerified(true);
    }
  }

  async function verifyAddress(verification) {
    resetApiResult()
      .then(() => {
        if(
          (!verification.deliverability || verification.deliverability !== 'deliverable') && 
          process.env.NODE_ENV === 'development'
        ) {
          return setVerificationResult({...verification, deliverability: 'deliverable'});
        }
        
        setVerificationResult(verification);
      }).catch(err => {
        console.log(err);
        setErrorMessage(err.message);
      });

    if(accessToken && !(accessToken.expiresAt - Date.now() < 1000)) {
      try {
        dispatch(determineShippingServicesAndTransitTimes({
          cart: {
            totalPrice: cartPrice,
            totalWeight: cartWeight
          },
          zip: selectedAddress.zip_code,
          accessToken: accessToken.accessToken
        }));
      } catch(err) {
        setErrorMessage(err.message);
      }
    }
  }

  function resetApiResult() {
    setVerificationResult({deliverability: null})
    setErrorMessage(null)
    return Promise.resolve()
  }

  function resetForm() {
    resetApiResult();
    setFieldsVerified(false);
    setSelectedAddress({});
  }

  useEffect(() => {
    async function verifyToken() {
      if(!accessToken || accessToken.expiresAt - Date.now() < 1000) {
        await fetchApiToken();
        const token = JSON.parse(localStorage.getItem('fedexToken'));
        return dispatch(setAccessToken(token));
      }
    }
    
    verifyToken();
  }, [accessToken, dispatch]);


  useEffect(() => {
    const verifyButton = document.querySelector('.address-section div > button');
    if(verifyButton && !fieldsVerified && verificationResult.deliverability !== 'deliverable') {
      verifyButton.disabled = true;
    } else if(verifyButton) {
      verifyButton.disabled = false;
    }
  }, [fieldsVerified, verificationResult?.deliverability]);

  function handleSelect(selection) {
    setSelectedAddress(selection.value);
  };

  function handleChange(payload) {
    setSelectedAddress(payload.address);
    verifyAllFields(payload.address);
    resetApiResult();
  }

  async function handleSubmit() {
    if(verificationResult.deliverability !== 'deliverable' && process.env.NODE_ENV !== 'development') {
      return;
    }
    
    const shippingAddress = {
      line1: selectedAddress.primary_line,
      line2: selectedAddress.secondary_line,
      city: selectedAddress.city,
      state: selectedAddress.state.toUpperCase(),
      postal_code: selectedAddress.zip_code,
      residential: residential
    }

    dispatch(setAddress(shippingAddress));
    console.log(selectedShippingInfo);
    const serverUrl = `http://${process.env.REACT_APP_SERVER_URL}/cart/shipping`;
    
    try {
      await patchApi(serverUrl, {shippingPrice: selectedShippingInfo.totalCharge});
    } catch(err) {
      console.error(err);
      return;
    }

    navigate('/checkout/payment');
  }

  const customStyles = {
    lob_container: provided => ({
      ...provided,
      borderRadius: '0.5rem',
      padding: '1rem'
    }),
    lob_row: provided => ({
      ...provided,
      color: '#7201b4',
      fontWeight: 'bold'
    }),
    lob_input: provided => ({
      ...provided,
      borderRadius: '0.5rem'
    })
  }

  return(
    <main className='shipping'>
      <section className='address-section'>
        <h2>Shipping Address</h2>
        { (!verificationResult.deliverability) && 
          <AddressForm 
            apiKey={process.env.REACT_APP_LOB_API_KEY}
            onFieldChange={handleChange}
            onSelection={handleSelect}
            onSubmit={verifyAddress}
            onError={err => console.log(err)}
            submitButtonLabel="Verify Address"
            hideSubmitButton={!fieldsVerified}
            disableLobLogo={true}
            styles={customStyles}
            children={
              <div className="residential-fieldset">
                <label htmlFor="residential">Is this address a residence?</label>
                <input 
                  type="checkbox" 
                  name="residential" 
                  id="residential"
                  checked={residential}
                  value={residential}
                  onChange={(e) => dispatch(toggleResidential({residential: e.target.checked}))} 
                />
              </div>
            }
          />
        }
        
        {(verificationResult.deliverability || errorMessage || error) && 
          <VerificationResult 
            apiResponse={verificationResult} 
            error={errorMessage || error?.message}
            resetForm={resetForm}
          />
        }
        {(verificationResult.deliverability === 'deliverable') && 
        <>
          <ShippingForm
            shippingInfo={shippingInfo}
            selectedShippingInfo={selectedShippingInfo}
            setSelectedShippingInfo={setSelectedShippingInfo}
          />
          <button 
            className='submit-shipping-button' 
            onClick={handleSubmit} 
            disabled={isLoading && !isError}
          >
            Go to payment
          </button>
        </>
        }
      </section>
    </main>
  )
}