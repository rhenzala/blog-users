import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Header />
      <Main />
    </div>
  )
}

export default App
