import { Routes, Route } from 'react-router-dom';
import HomePage from "../src/components/root/HomePage"
import PrintingSystem from "../src/components/root/PrintPage"
import PrintingPage from "../src/components/root/BuyPaper"

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/print" element={<PrintingSystem />} />
        <Route path="/buyPaper" element={<PrintingPage />} />
      </Routes>
    </div>
  )
}