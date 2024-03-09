import { useState } from 'react';
import './loginForm.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router';

export function LoginForm({ handleSubmit, formData, handleChange, error }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }

  return (
    <form
      className='right'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='username'
        className='username'
        value={formData.username}
        autoComplete='username'
        onChange={handleChange}
        placeholder='Email or Username'
      />
      <div className='password-wrapper'>
        <input
          type={passwordVisible ? 'text' : 'password'}
          name='password'
          className='password'
          value={formData.password}
          autoComplete='current-password'
          onChange={handleChange}
          placeholder='Password'
        />
        <button
          className='show-password-button'
          type='button'
          onClick={handleClick}
          aria-label='Show Password'
        >
          {<FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />}
        </button>
      </div>
      {error && (
        <h4 className='error-message'>{`Error ${error.status}: ${error.message}`}</h4>
      )}
      <button
        type='submit'
        className='login-submit-button'
      >
        Login
      </button>
      <button
        type='button'
        className='register-button'
        onClick={() => navigate('/registration')}
      >
        Register
      </button>
    </form>
  );
}
