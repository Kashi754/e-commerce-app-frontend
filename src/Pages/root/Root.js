import { Outlet } from "react-router-dom";
import { Header } from "../../Components/header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "../user/userSlice";

export function Root() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}