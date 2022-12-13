import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import ContactTracing from './pages/ContactTracing';
import Qrcode from './pages/Qrcode';
import PositiveResult from './pages/PositiveResult';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {authToken && <Route path='/dashboard' element={<Dashboard/>}/>}
        {authToken &&<Route path='/onboarding' element={<Onboarding/>}/>}
        {authToken &&<Route path='/qrcode' element={<Qrcode/>}/>}
        {authToken &&<Route path='/contacttracing' element={<ContactTracing/>}/>}
        {authToken &&<Route path='/testresult' element={<PositiveResult/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
