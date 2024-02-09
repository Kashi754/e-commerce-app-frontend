import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header } from "../../Components/header/Header";
import { loadCartData } from "../cart/cartSlice";
import { loadUser, selectIsLoggedIn } from "../user/userSlice";

export function Root() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
      dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if(isLoggedIn) {
      dispatch(loadCartData());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}