import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { logoutAction } from "../../redux/auth/api-actions";
import { getAuthStatus } from "../../redux/auth/selectors";
import { AuthStatus } from "../../const";

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav__logo">
          LOGO
        </div>
        <div className="nav__links">
          {
            authStatus === AuthStatus.Unauthorized
            ? <Link to={AppRoute.Login}>Login</Link>
            : 
            <div className="account">
              <div className="account__logout" onClick={logoutHandler}>Logout</div>
            </div>
          }
        </div>
      </nav>
    </header>
  ); 
};

export default Header;