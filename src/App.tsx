import { useState } from 'react';
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/Login';

function App() {
  const [mylaminas, setMylaminas] = useState<Array<{
    movies: Films[],
    characters: People[],
    ships: Starship[]
  }>>([])

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setIsLogin={setIsLogin} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
