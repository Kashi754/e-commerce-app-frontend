import { useState } from "react";
import "./loginForm.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

export function LoginForm({ handleSubmit, formData, handleChange, isError, error }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }

  return (
    <form className="right" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          className="username"
          value={formData.username} 
          onChange={handleChange} 
          placeholder="Email or Username" 
        />
        <div className="password-wrapper">
          <input 
            type={passwordVisible ? "text" : "password"} 
            name="password"
            className="password"
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Password" 
          />
          <button className="show-password-button" type="button" onClick={handleClick}>{
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          }</button>
        </div>
        {isError && <h4 className="error-message">{error.message}</h4>}
        <button type="submit" className="login-submit-button">Login</button>
      </form>
  );
}