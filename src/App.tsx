import { useState } from 'react';
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/Login';
import Home from './components/Home';

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
          <Route path='/' element={!isLogin ? <Login setIsLogin={setIsLogin} /> : <Home laminas={mylaminas} />} /* si el usuario aun,
           no esta loggeado seguira apareciendo el Componente Login, en caso contrario, aparecera el home, con el album */ />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
