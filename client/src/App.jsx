
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductByBrand from "./pages/ProductByBrand"
import LoginPage from "./pages/LoginPage"
import OtpPage from "./pages/OtpPage"
function App() {


  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/by-brand/:id" element={<ProductByBrand />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/otp" element={<OtpPage />} />
    {/* Add more routes as needed */}
  </Routes>
  </BrowserRouter>
}

export default App
