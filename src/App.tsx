import './App.css'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router";
import Product from './pages/Product'
import CheckoutPage from './pages/Checkout'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <Navbar />

          </nav>
          <div className='container mx-auto h-screen pt-16'>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider >
  )
}

export default App
