import { useState } from 'react';
import './App.css'

function App() {
  const [mylaminas, setMylaminas] = useState<Array<{
    movies: Films[],
    characters: People[],
    ships: Starship[]
  }>>([])

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <>
      <h2>Hello world</h2>
    </>
  )
}

export default App
