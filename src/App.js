import Home from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/dashboard'} element={<Dashboard/>}/>
        <Route path={'/onboarding'} element={<OnBoarding/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
