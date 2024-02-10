import { useDispatch } from "react-redux";
import { useState } from "react";
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import './registration.css';
import { useNavigate } from "react-router";

export function Registration () {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: ""
  });
  const [matchedPasswords, setMatchedPasswords] = useState(false);
  const [correctPassword, setCorrectPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;
  const urlBase = `http://${url}`;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const serverUrl = `${urlBase}/register`;
        const {password2, ...body} = formData;

        const response = await fetch(serverUrl, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if(!response.ok) {
            const error = await response.json();
            setError(error);
            throw new Error(error.message);
        }
        const data = await response.json();
        console.log(data.message);
        
        navigate('/login');
  }

  function verifyPassword(name, value) {
    if(name ==="password") {
      if (validator.isStrongPassword(value, { 
        minLength: 8, minLowercase: 1, 
        minUppercase: 1, minNumbers: 1, minSymbols: 1 
      })) { 
          setCorrectPassword(true);
      } else { 
          setCorrectPassword(false);
      }

      if(formData.password2 === value) {
        setMatchedPasswords(true);
      } else {
        setMatchedPasswords(false);
      }
    }

    if(name === "password2") {
      if(formData.password === value) {
        setMatchedPasswords(true);
      } else {
        setMatchedPasswords(false);
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    verifyPassword(name, value);
  }

  function handleClick(e) {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }


  return (
    <main className="registration">
      <section className="registration-container">
        <h2>Sign-Up</h2>
        <form className='registration-form' onSubmit={handleSubmit}>
          <fieldset className="username-field field">
            <label htmlFor="username">Choose a Username: </label>
            <input 
              type='text' 
              id="username" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
            />
          </fieldset>
          <fieldset className="email-field field">
            <label htmlFor="email">Email: </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange} 
            />
          </fieldset>
          <fieldset className="password-field">
            <div className="password1-field field">
              <label htmlFor="password">Choose a Password: </label>
              <input 
                type={passwordVisible ? "text" : "password"} 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange} 
              />
              <button className="show-password-button" type="button" onClick={handleClick}>{
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              }</button>
            </div>
            {
              !correctPassword && 
              <p className="error-message password-error">
                Password must contain at least 8 characters including UPPER/lowercase, 1 number, and 1 special symbol.</p>
            }
            <div className="password2-field field">
              <label htmlFor="password2">Re-Enter Password: </label>
              <input 
                type={passwordVisible ? "text" : "password"} 
                id="password2" 
                name="password2"
                value={formData.password2}
                onChange={handleChange} 
              />
            </div>
            {
              !matchedPasswords && 
              <p className="error-message password-error">
                Passwords must match.
              </p>
            }
          </fieldset>

          <fieldset className="first-name-field field">
            <label htmlFor="first-name">First Name: </label>
            <input 
              type="text" 
              id="first-name" 
              name="first_name" 
              value={formData.first_name}
              onChange={handleChange} 
            />
          </fieldset>
          <fieldset className="last-name-field field">
            <label htmlFor="last-name">Last Name: </label>
            <input 
              type="text" 
              id="last-name" 
              name="last_name" 
              value={formData.last_name}
              onChange={handleChange} 
            />
          </fieldset>
          <button className="registration-submit-button" type="submit">Register User</button>
        </form>
      </section>
    </main>
  );
}