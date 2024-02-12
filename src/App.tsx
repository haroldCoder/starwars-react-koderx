import { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Laminas from './components/Laminas';

function App() {
  const [mylaminas, setMylaminas] = useState<{
    movies: Films[],
    characters: People[],
    ships: Starship[]
  }>({
    movies: [],
    characters: [],
    ships: []
  })

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [time, setTime] = useState<{
    minute: number,
    seconds: number
  }>({
    minute: 0,
    seconds: 59
  }) // crear stado para manejar el tiempo de espera para abrir otro sobre.

  const [startTime, setStartTime] = useState<boolean>(false);

  useEffect(() => {
    if (time.seconds == 0) {
      setTime(() => {
        return ({
          minute: 0,
          seconds: 59
        })
      })
    }
  }, [time]) // este useEffect estara atento del el stado del tiempo, en cuanto los segundo lleguen a 0 se vuelve a resetear de fabrica

  useEffect(() => {
    if (startTime) {
      const t = setInterval(() => {
        setTime(prev => {
          if (prev.seconds == 1) { // cuando el seconds llegue a 0 se limpia el intervalo y ponemos el stado de abrir otro sobre disponible
            clearInterval(t)
            setStartTime(false)
          }
          return ({
            minute: prev.minute,
            seconds: prev.seconds - 1
          })
        });
      }, 1000); // cada segundo el seconds del stado de time, se le restara de a una unidad


      return () => clearInterval(t); // Limpia el intervalo al desmontar el componente
    }

  }, [setTime, startTime]); //crear  el useEffect con las dependencias de si es habilitado abrir el sobre, y el de cambiar el estado del tiempo

  return (
    <>
      <BrowserRouter>
        {
          isLogin ?
            <Navbar />
            : null
        }
        <Routes>
          <Route path='/' element={!isLogin ? <Login setIsLogin={setIsLogin} /> : <Home laminas={mylaminas} />} /* si el usuario aun,
           no esta loggeado seguira apareciendo el Componente Login, en caso contrario, aparecera el home, con el album */ />

          {
            isLogin ? // ruta protegida
              <Route path='/obtener_laminas' element={<Laminas startTime={startTime} setStartTime={setStartTime} setMyLaminas={setMylaminas} />} />
              : null
          }
        </Routes>
      </BrowserRouter>
      {
        isLogin ? /* si el usuario ya esta logueado, abra una especie de ventana emergente en la parte posterior de abajo, que nos muestra el tiempo para abrir otro sobre */
          <div className='absolute top-[90%] left-[90%]'>
            <h2 className={` ${time.seconds < 59 ? 'text-red-700' : 'text-green-600' /* este sera un indicador, para que el usuario sepa cuando hay disponibilidad */} text-xl font-semibold`}>{time.minute}:{time.seconds}</h2>
          </div>
          : null
      }
    </>
  )
}

export default App
