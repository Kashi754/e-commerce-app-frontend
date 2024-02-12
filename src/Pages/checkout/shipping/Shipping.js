import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { determineTransitTimes, selectAccessToken, selectAddress, selectShippingServices, selectTransitTimes, setAccessToken, setAddress } from './shippingSlice';
import { selectCart } from '../../cart/cartSlice';
import { AddressForm } from '@lob/react-address-autocomplete';
import VerificationResult from '../../../Components/shippingForm/VerificationResult';
import { useNavigate } from 'react-router';

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

  const token = JSON.stringify(await response.json());
  console.log(token);
  
  localStorage.setItem('fedexToken', JSON.stringify(token));
}

async function determineShippingServices(accessToken, shippingAddress, cart) {
  const url = 'https://apis.sandbox.fedex.com';
  const path = '/availability/v1/packageandserviceoptions'

  const body = JSON.stringify({
    shipper: {
      address: {
        postalCode: 23602,
        countryCode: 'US',
      }
    },
    recipients: [{
      address: {
        postalCode: shippingAddress.zip,
        countryCode: 'US',
      }
    }],
    requestedPackageLineItems: [{
      weight: {
        units: 'LB',
        value: cart.totalWeight
      }
    }],
    carrierCodes: [
      'FDXG'
    ]
  });

  const response = await fetch(url + path, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        'X-locale': "en_US",
        'Authorization': `Bearer ${accessToken}`
    },
    body: body,
    credentials: 'include'
  });

  if(!response.ok) {
      const error = await response.json();
      throw error;
  }

  const data = await response.json();
  return data;
}

export function Shipping() {
  const shippingAddress = useSelector(selectAddress);
  const accessToken = useSelector(selectAccessToken);
  const cart = useSelector(selectCart);
  const transitTimes = useSelector(selectTransitTimes);
  const shippingServices = useSelector(selectShippingServices);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState({});
  const [verificationResult, setVerificationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function verifyToken() {
      let token = JSON.parse(localStorage.getItem('fedexToken'));
      if(!token || Date.now() - token.expiresAt < 1000) {
        await fetchApiToken();
        token = JSON.parse(localStorage.getItem('fedexToken'));
      } else if(token !== accessToken) {
        console.log(token);
        dispatch(setAccessToken(token.access_token));
      }
    }
    verifyToken();
  }, [dispatch, accessToken]);

  useEffect(() => {
    if(accessToken) {
      dispatch(determineShippingServices({
        cart: cart,
        shippingAddress,
        accessToken
      }));

      dispatch(determineTransitTimes({
        cart: cart,
        shippingAddress,
        accessToken
      }));
    }
  }, [dispatch, cart, shippingAddress, accessToken]);

  const resetApiResult = () => {
    setVerificationResult(null)
    setErrorMessage(null)
    return Promise.resolve()
  }

  function handleSelect(selection) {
    console.log('Address Selection', selection.value);
    setSelectedAddress(selection.value);
  };

  function handleChange(payload) {
    console.log(`${payload.event.target.id} Field Change`, payload.address);
    setSelectedAddress(payload.address);
    resetApiResult();
  }

  async function handleSubmit(verificationResult) {
    try {
      await resetApiResult();
      if(
        verificationResult.deliverablility !== 'deliverable' && 
        process.env.NODE_ENV !== 'development'
      ) {
        setVerificationResult(verificationResult);
        return;
      }

      const shippingAddress = {
        line1: selectedAddress.primary_line,
        line2: selectedAddress.secondary_line,
        city: selectedAddress.city,
        state: selectedAddress.state,
        postal_code: selectedAddress.zip_code
      }

      dispatch(setAddress(shippingAddress));
      navigate('/checkout/payment');
    } catch(err) {
      setErrorMessage(err.Message)
    }
  }




  return(
    <main className='shipping'>
      <AddressForm 
        apiKey={process.env.REACT_APP_LOB_API_KEY}
        onFieldChange={handleChange}
        onSelection={handleSelect}
        onSubmit={handleSubmit}
        submitLabel="Verify"
        disableLobLogo={true}
        styles={{
          'lob-submit': { width: '100%' }
        }}
      />
      <VerificationResult apiResponse={verificationResult} error={errorMessage} />
      
    </main>
  )
}