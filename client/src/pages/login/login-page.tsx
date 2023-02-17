import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLock, faEnvelope, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { loginAction } from "../../redux/auth/api-actions";
import { getAuthStatus } from "../../redux/auth/selectors";
import { User } from '../../types/auth.types';
import { AppRoute, AuthStatus } from "../../const";

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({ email: '', password: '' });

  const authStatus = useAppSelector(getAuthStatus);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAction(formData));
  };

  useEffect(() => {
    if (authStatus === AuthStatus.Authorized) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  return (
    <div className="login">
      <div className="container col-10">
        <div className="login__header">
          <div className="logo">
            <FontAwesomeIcon icon={faKey} />
          </div>        
          <h3>Sign In</h3>
        </div>
        <form className="login__form" onSubmit={submitHandler}>
          <div className="mb-3 inputBox">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <input 
              type="text"
              name="email"
              required
              onChange={changeHandler}
            />
            <label>Email</label>
          </div>

          <div className="mb-3 inputBox">
            <FontAwesomeIcon className="icon" icon={faLock} />
            <input
              type="password"
              name="password"
              required
              onChange={changeHandler}
            />
            <label>Password</label>
          </div>
          
          <Link className="signup_link" to={AppRoute.Register}>
            <FontAwesomeIcon icon={faUserPlus} /> Sign Up
          </Link>
          <button type="submit" className="login__button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
