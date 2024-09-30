// import { Routes, Route } from 'react-router-dom';
// import Eshop from "../src/components/root/home/HomePage"
// import Products from './components/root/products/Product';
// import MyComponent from "./components/root/Homepage/body/MyComponent"
import HomePage from "./components/root/HomePage"
// import BuyPaper from "./components/root/BuyPaper"
export default function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Eshop />} />
        <Route path="/products" element={<Products />} />
      </Routes> */}
      <HomePage></HomePage>
      {/* <BuyPaper/> */}
    </div>
  )
}