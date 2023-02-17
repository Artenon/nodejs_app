import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppRoute } from "../const";
import Main from "../pages/main/main-page";
import Login from "../pages/login/login-page";
import Register from "../pages/login/register-page";
import { useAppDispatch } from "../hooks/hooks";
import { getAuthStatus } from "../redux/auth/api-actions";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAuthStatus());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={AppRoute.Main} element={ <Main /> } />
          <Route path={AppRoute.Login} element={ <Login /> } />
          <Route path={AppRoute.Register} element={ <Register /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
