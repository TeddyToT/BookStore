import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const HomeRedirect = () => {
  const { userDetail } = useContext(DataContext);

  if (userDetail) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default HomeRedirect;
