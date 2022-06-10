import Home from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  const [cookies,setCookies,removeCookies] = useCookies(null);
  const AuthToken = cookies.AuthToken;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        {AuthToken && <Route path={'/dashboard'} element={<Dashboard/>}/>}
        {AuthToken && <Route path={'/onboarding'} element={<OnBoarding/>}/>}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
