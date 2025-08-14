
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductByBrand from "./pages/ProductByBrand"
import LoginPage from "./pages/LoginPage"
import OtpPage from "./pages/OtpPage"
import ProfileScreen from "./pages/ProfileScreen"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartePage from "./pages/CartPage"
import InvoicePage from "./pages/InvoicePage"
import WishListPage from "./pages/WishListPage"
function App() {


  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/by-brand/:id" element={<ProductByBrand />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/otp" element={<OtpPage />} />
    <Route path="/profile" element={<ProfileScreen />} />
    <Route path="/product-details/:id" element={<ProductDetailsPage />} />
    <Route path="/cart" element={<CartePage />} />
    <Route path="/payment" element={<InvoicePage/>}/>
    <Route path="/wishList" element={<WishListPage/>} />
    
  </Routes>
  </BrowserRouter>
}

export default App
