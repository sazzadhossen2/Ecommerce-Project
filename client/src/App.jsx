
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductByBrand from "./pages/ProductByBrand"
function App() {


  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/by-brand/:id" element={<ProductByBrand />} />
  </Routes>
  </BrowserRouter>
}

export default App
