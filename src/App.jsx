import { useState } from 'react'
import './App.css'

import  Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

    

  return (
    <>
      <div>
       <Card></Card>
      </div>
    </>
  )
}

export default App
