import { Link } from 'react-router-dom';
import './footer.css';

export function Footer() {
  return (
    <div className='footer'>
      <p className='disclaimer'>
        For Educational Purposes Only. Payments are simulated. (See{' '}
        <Link
          className='disclaimer-link'
          to='https://docs.stripe.com/testing?testing-method=card-numbers#use-test-cards'
        >
          Stripe API documentation
        </Link>{' '}
        for valid card numbers.)
        <br />
        <br />
        Click
        <Link
          className='disclaimer-link'
          to='/docs'
        >
          {' '}
          here{' '}
        </Link>
        to view the documentation for the API.
      </p>
      <h3>Powered by Stripe</h3>
      <p>
        <span>E-Commerce App </span>
        by
        <a
          rel='cc:attributionURL dct:creator'
          href='http://kashi754.com'
        >
          {' '}
          Kashi754
        </a>{' '}
        is licensed under{' '}
        <a
          href='http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1'
          target='_blank'
          rel='license noopener noreferrer'
          style={{ display: 'inline-block' }}
        >
          {' '}
          CC BY-NC-SA 4.0{' '}
          <img
            style={{
              height: '22px',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src='https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1'
            alt='cc icon'
          />
          <img
            style={{
              height: '22px',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src='https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1'
            alt='cc by icon'
          />
          <img
            style={{
              height: '22px',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src='https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1'
            alt='cc nc icon'
          />
          <img
            style={{
              height: '22px',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src='https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1'
            alt='cc sa icon'
          />
        </a>
      </p>
    </div>
  );
}
