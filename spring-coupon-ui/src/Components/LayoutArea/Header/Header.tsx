import { useEffect, useState } from "react";
import "./Header.css";
import UserCredentialsModel from "../../../Models/UserCredentialsModel";
import { AuthStore, authReducer } from "../../../Redux/AuthState";

interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps): JSX.Element {
  const [user, setUser] = useState<UserCredentialsModel>();

  useEffect(() => {
    setUser(AuthStore.getState().user);
    const unsubscribe = AuthStore.subscribe(() => {
      setUser(AuthStore.getState().user);
    });
    return () => unsubscribe();
  }, [])


  return (
    <div className="Header">

      <div className="title-wrapper">
        <h1 className="sweet-title">
          <span >ROWI</span>
          <br />
          <span>COUPONS</span>
        </h1>
      </div>


      {user && <span className="greeting"> Hello There, {user.name} </span>}
    </div>
  );
}

export default Header;
