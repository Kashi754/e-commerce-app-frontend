import './footer.css';

export function Footer() {
  return (
    <div className='footer'>
      <h2>
        For Educational Purposes Only (Do not attempt to purchase any items)
      </h2>
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
          />
          <img
            style={{
              height: '22px',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src='https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1'
          />
          <img
            style={{
              height: '22px',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src='https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1'
          />
          <img
            style={{
              height: '22px',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src='https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1'
          />
        </a>
      </p>
    </div>
  );
}
