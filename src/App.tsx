import './App.css'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'

function App() {

  return (
    <Provider store={store}>
      <Navbar />
      <div className='container max-w-7xl mx-auto'>
          <Landing />
      </div>
    </Provider>
  )
}

export default App
