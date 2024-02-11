import { Dispatch, useEffect, useState } from 'react';
import yoda from '../assets/bebeyoda.png';
import axios from 'axios';
import Card from './Card';

export default function Sobres({ setMyLaminas, setCountsobres, index, setTime }: {
    setMyLaminas: Dispatch<React.SetStateAction<{
        movies: Films[];
        characters: People[];
        ships: Starship[];
    }>>, setTime: React.Dispatch<React.SetStateAction<{
        minute: number;
        seconds: number;
    }>>,
    setCountsobres: React.Dispatch<React.SetStateAction<number[]>>,
    index: number
}) {

    const [isAvailable, setIsAvailable] = useState<boolean>(true); // crear stado para manejar, si esta activo el poder abrir otro sobre
    const [sobre, setSobre] = useState<{
        movies: Films[];
        characters: People[];
        ships: Starship[];
    }>({ movies: [], characters: [], ships: [] }); // crear stado para el sobre temporal, es decir aqui se guarda los datos del sobre que el usuario le da click

    const OpenSobre = async () => {
        if (isAvailable) { // en caso de que sea habilitado se realiza el proceso, para seleccionar el sobre

            //eliminar el sobre presionado
            setCountsobres((prev)=>{
                prev = prev.filter((_, i)=> i != index)
                return prev
            }) // usar el set del stado para remover el sobre ya elejido

            setIsAvailable(false)
            let settings: number = Math.floor((Math.random() * 2) + 1) /* cada ves que se le de click a el sobre se elejira un numero aleatorio(1, 2),
             para ver que cartas deben salir */
            const res: {
                movies: Films[];
                characters: People[];
                ships: Starship[];
            } = {
                movies: [],
                characters: [],
                ships: []
            }; //crear esta variable para almacenar las distintas laminas


            switch (settings) {
                case 1: //crear numeros aleatorios para que salgan un numero determinado de laminas
                    let moviesRand = Math.floor((Math.random() * 6) + 1);
                    try {
                        res.movies[0] = (await axios.get(`https://swapi.dev/api/films/${moviesRand}`)).data;
                    }
                    catch (e) {
                        res.movies[0] = {
                            "title": "Película no encontrada",
                            "episode_id": 0,
                            "opening_crawl": "Información no disponible",
                            "director": "Desconocido",
                            "producer": "Desconocido",
                            "release_date": "Desconocido",
                            "characters": [],
                            "planets": [],
                            "starships": [],
                            "vehicles": [],
                            "species": [],
                            "created": "Desconocido",
                            "edited": "Desconocido",
                            "url": "Desconocido"
                        }; // si da error, pone un json ficticio
                    }


                    try {
                        for (let i = 0; i < 3; i++) { // si es mas de una carta, se tira con un ciclo las veces, necesarias
                            let charactRand = Math.floor((Math.random() * 82) + 1);
                            res.characters.push((await axios.get(`https://swapi.dev/api/people/${charactRand}`)).data)
                        }
                    }

                    catch (e) {
                        for (let i = 0; i < 3; i++) {
                            let charactRand = Math.floor((Math.random() * 82) + 1);
                            await axios.get(`https://swapi.dev/api/people/${charactRand + 1}`)
                                .then((e) => {
                                    res.characters.push(e.data)
                                })
                                .catch(() => {
                                    res.characters.push({
                                        "name": "Personaje no encontrado",
                                        "height": "Desconocido",
                                        "mass": "Desconocido",
                                        "hair_color": "Desconocido",
                                        "skin_color": "Desconocido",
                                        "eye_color": "Desconocido",
                                        "birth_year": "Desconocido",
                                        "gender": "Desconocido",
                                        "homeworld": "Desconocido",
                                        "films": [],
                                        "species": [],
                                        "vehicles": [],
                                        "starships": [],
                                        "created": "0-01-01T13:50:51.644000Z",
                                        "edited": "0-01-01T13:50:51.644000Z",
                                        "url": "Desconocido"
                                    })
                                })
                        }
                    }


                    let shipsRand = Math.floor((Math.random() * 36) + 1)
                    try {
                        res.ships[0] = ((await axios.get(`https://swapi.dev/api/starships/${shipsRand}`)).data);
                    }
                    catch (e) {
                        res.ships[0] = {
                            "name": "Nave no encontrada",
                            "model": "Desconocido",
                            "manufacturer": "Desconocido",
                            "cost_in_credits": "Desconocido",
                            "length": "Desconocido",
                            "max_atmosphering_speed": "Desconocido",
                            "crew": "Desconocido",
                            "passengers": "Desconocido",
                            "cargo_capacity": "Desconocido",
                            "consumables": "Desconocido",
                            "hyperdrive_rating": "Desconocido",
                            "MGLT": "Desconocido",
                            "starship_class": "Desconocido",
                            "pilots": [],
                            "films": [],
                            "created": "Desconocido",
                            "edited": "Desconocido",
                            "url": "Desconocido"
                        };
                    }

                    break;
                case 2:
                    try {
                        for (let i = 0; i < 3; i++) {
                            let charactRand = Math.floor((Math.random() * 82) + 1);
                            res.characters.push((await axios.get(`https://swapi.dev/api/people/${charactRand}`)).data)
                        }
                    }
                    catch (e) {
                        for (let i = 0; i < 3; i++) {
                            let charactRand = Math.floor((Math.random() * 82) + 1);
                            await axios.get(`https://swapi.dev/api/people/${charactRand + 1}`)
                                .then((e) => {
                                    res.characters.push(e.data)
                                })
                                .catch(() => {
                                    res.characters.push({
                                        "name": "Personaje no encontrado",
                                        "height": "Desconocido",
                                        "mass": "Desconocido",
                                        "hair_color": "Desconocido",
                                        "skin_color": "Desconocido",
                                        "eye_color": "Desconocido",
                                        "birth_year": "Desconocido",
                                        "gender": "Desconocido",
                                        "homeworld": "Desconocido",
                                        "films": [],
                                        "species": [],
                                        "vehicles": [],
                                        "starships": [],
                                        "created": "0-01-01T13:50:51.644000Z",
                                        "edited": "0-01-01T13:50:51.644000Z",
                                        "url": "Desconocido"
                                    })
                                })
                        }
                    }

                    try {
                        for (let i = 0; i < 2; i++) {
                            let shipsRand = Math.floor((Math.random() * 36) + 1);
                            res.ships[i] = ((await axios.get(`https://swapi.dev/api/starships/${shipsRand}`)).data)
                        }
                    }
                    catch (e) {
                        for (let i = 0; i < 2; i++) {
                            let shipsRand = Math.floor((Math.random() * 36) + 1);
                            await axios.get(`https://swapi.dev/api/starships/${shipsRand}`)
                                .then((e) => {
                                    res.ships[i] = e.data
                                })
                                .catch(() => {
                                    res.ships[i] = {
                                        "name": "Nave no encontrada",
                                        "model": "Desconocido",
                                        "manufacturer": "Desconocido",
                                        "cost_in_credits": "Desconocido",
                                        "length": "Desconocido",
                                        "max_atmosphering_speed": "Desconocido",
                                        "crew": "Desconocido",
                                        "passengers": "Desconocido",
                                        "cargo_capacity": "Desconocido",
                                        "consumables": "Desconocido",
                                        "hyperdrive_rating": "Desconocido",
                                        "MGLT": "Desconocido",
                                        "starship_class": "Desconocido",
                                        "pilots": [],
                                        "films": [],
                                        "created": "Desconocido",
                                        "edited": "Desconocido",
                                        "url": "Desconocido"
                                    }
                                })
                        }

                    }

                    break;
            }

            setSobre(res) // settear el sobre con los nuevos valores recolectados
        }
    }

    useEffect(() => {
        if (!isAvailable) { // Si isAvailable es false
            const t = setInterval(() => {
                setTime(prev => {
                    if (prev.seconds == 1) { // cuando el seconds llegue a 0 se limpia el intervalo y ponemos el stado de abrir otro sobre disponible
                        clearInterval(t)
                        setIsAvailable(true)
                    }
                    return ({
                        minute: prev.minute,
                        seconds: prev.seconds - 1
                    })
                });
            }, 1000); // cada segundo el seconds del stado de time, se le restara de a una unidad


            return () => clearInterval(t); // Limpia el intervalo al desmontar el componente
        }

    }, [isAvailable, setTime]); //crear  el useEffect con las dependencias de si es habilitado abrir el sobre, y el de cambiar el estado del tiempo

    return (
        <div onClick={OpenSobre} className={`cursor-pointer h-[50vh] w-[20%] hover:to-green-700 hover:from-green-400 p-20 flex justify-center ${!isAvailable ? 'opacity-90' : null} items-center rounded-md bg-gradient-to-tr to-gray-700 from-black`}>
            <img src={yoda} alt="icon_sobre" />
            {
                !isAvailable && sobre != null ?
                    <div className='absolute top-[15%] left-[15%] w-[80%] bg-[#3333338e]' style={{ backdropFilter: "blur(6px)" }}>
                        <Card laminas={sobre} setSobre={setSobre} setMylaminas={setMyLaminas} /> {/* pasar el setMylaminas, por si el usuario, quiere coleccionar alguna lamina */}
                    </div>
                    : null
            }
        </div>
    )
}
