import React from "react";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsError, selectIsLoading, selectError, logout } from "../../Pages/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserLink } from "./UserLink";
import { UserCart } from "./UserCart";
import { quantum } from "ldrs";
import './UserInfo.css';
quantum.register();

export function UserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  function handleClick(event) {
    event.preventDefault();
    console.log(isLoggedIn);
    if(isLoggedIn) {
      dispatch(logout());
      navigate('/');
    } else {
      navigate('/login');
    }
  }

  if(isError) {
    console.log(error);
  }

  if(isLoading) {
    return (
      <div className="loader">
          <l-quantum size="45" speed="1.75" color="black" />
      </div>
    )
  }


  if(isLoggedIn) {
    return (
      <div className="user-info">
        <button className="logout-button" onClick={handleClick}>{isLoggedIn? "Logout" : "login"}</button>
        <UserLink />
        <UserCart />
      </div>
    );
  } else {
    return (
      <div className="user-info">
        <button className="login-button" onClick={handleClick}>{isLoggedIn? "Logout" : "login"}</button>
      </div>
    );
  }
}