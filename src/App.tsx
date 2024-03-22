import { useState } from 'react'
import './App.css'
import { NavBar } from './ui/components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
    </>
  )
}

export default App
