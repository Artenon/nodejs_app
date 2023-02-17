import { useState, FormEvent, ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge, faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../hooks/hooks";
import { registerAction } from "../../redux/auth/api-actions";
import { User } from '../../types/auth.types';
import { AppRoute } from "../../const";

const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const Register = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const confirmRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<User>({ email: '', username: '', password: '' });
  const [isConfirmEqual, setIsConfirmEqual] = useState<boolean>(false);
  const [isConfirmEmpty, setIsConfirmEmpty] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      checkEmailValid(e.target.value);
    } else if (e.target.name === 'password') {
      checkPasswordValid(e.target.value);
    }
  };

  const checkEmailValid = (email: string) => {
    email.match(validEmailRegex)
    ? setIsEmailValid(true)
    : setIsEmailValid(false);
  };

  const checkPasswordValid = (password: string) => {
    password.length >= 6
    ? setIsPasswordValid(true)
    : setIsPasswordValid(false);

    password === confirmRef.current?.value
    ? setIsConfirmEqual(true)
    : setIsConfirmEqual(false);
  };

  const confirmPasswordHandler = () => {
    if (confirmRef.current) {
      if (confirmRef.current.value === '') {
        setIsConfirmEmpty(true);
      } else if (formData.password === confirmRef.current.value) {
        setIsConfirmEqual(true);
        setIsConfirmEmpty(false);
      } else {
        setIsConfirmEqual(false);
        setIsConfirmEmpty(false);
      };
    };
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmRef.current) {
      if (isConfirmEqual && isEmailValid && isPasswordValid) {
        dispatch(registerAction(formData))
        navigate(AppRoute.Login);
      }
    }
  };

  return (
    <div className="login">
      <div className="container col-10">
        <div className="login__header">
          <div className="logo">
            <FontAwesomeIcon icon={faUserLarge} />
          </div>
          <h3>Sign Up</h3>     
        </div>
        <form className="login__form" onSubmit={submitHandler}>
          <div className="mb-3 inputBox">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <input 
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={changeHandler}
            />
            <label>Email</label>
            {
              !isEmailValid
              ? <div className="hint">Invalid Email</div>
              : null
            }
          </div>

          <div className="mb-3 inputBox">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <input 
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={changeHandler}
            />
            <label>Username</label>
          </div>

          <div className="mb-3 inputBox">
            <FontAwesomeIcon className="icon" icon={faLock} />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={changeHandler}
            />
            <label>Password</label>
            {
              !isPasswordValid
              ? <div className="hint">At least 6 symbols</div>
              : null
            }
          </div>

          <div className={`mb-3 inputBox ${isConfirmEmpty && 'empty'} ${isConfirmEqual ? 'equal' : 'not-equal'}`}>
            <FontAwesomeIcon className="icon" icon={faLock} />
            <input
              type="password"
              required
              onChange={confirmPasswordHandler}
              ref={confirmRef}
            />
            <label>Confirm Password</label>
          </div>

          <button type="submit" className="login__button">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
