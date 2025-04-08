
import './App.css'
import Navbar from './components/Navbar'
import ProductPage from './components/ProductPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App
