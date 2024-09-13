import { useSelector } from "react-redux";

import { Outlet, Navigate } from "react-router-dom";
export default function UserPrivateRoute() {

  const { auth } = useSelector((state) => state.auth);

  return auth && auth?.user_type !=='admin' ? <Outlet /> : <Navigate to="/" />;
}
