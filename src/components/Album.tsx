import { useEffect, useState } from "react";
import error from "../assets/404.png"
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

export default function Album({ laminas }: {
  laminas: {
    movies: Films[];
    characters: People[];
    ships: Starship[]; /* implementar los tipos predefinidos en el archivo .d.ts */
  }
}) {

  const [url, setUrl] = useState<{
    url: string,
    type: string
  }>({
    url: "",
    type: ""
  });
  const [info_lamina, setInfolam] = useState<{
    character?: People,
    movies?: Films,
    ships?: Starship
  }>();

  useEffect(() => {
    const getInfoLam = async () => {
      console.log(url);
      await axios.get(url.url)
        .then((res) => {
          setInfolam((prev) => {
            switch (url.type) {
              case "movies":
                return { ...prev, movies: res.data }
                break;

              case "characters":
                return { ...prev, character: res.data }
                break;

              case "ships":
                return { ...prev, ships: res.data }

            }

            return prev
          })

          console.log(res);

        })
        .catch((err) => {
          console.log(err);
        })
    }

    getInfoLam();
  }, [url])

  return (
    <div className={`flex ${laminas.characters.length == 0 && laminas.movies.length == 0 && laminas.ships.length == 0 ? 'justify-center items-center p-20' : 'p-10'}`}>
      {
        laminas.characters.length == 0 && laminas.movies.length == 0 && laminas.ships.length == 0 ? /* si no hay laminas almacenadas, mostrar imagen de 404 */
          <img src={error} alt="404" />
          : /* de lo contrario mostrar todos los items, con los respectivos datos */
          <section className="gap-y-10 flex flex-col">

            {/* sesion de peliculas */}

            <div>
              <h2 className="text-3xl mb-5 text-gray-600 font-semibold">Peliculas</h2>
              <div className="flex gap-4 justify-between flex-wrap">
                {
                  laminas.movies.length != 0 ?
                    laminas.movies.sort((a, b)=>{ // crear el sort para ordenar las laminas segun el id de la url
                      const matchA = a.url.match(/\/([^\/]+)\/$/);
                      const matchB = b.url.match(/\/([^\/]+)\/$/);
                    
                      if (matchA && matchA[1] && matchB && matchB[1]) {
                        return parseInt(matchA[1]) - parseInt(matchB[1]); // hacer una diferencia entre las distintas laminas
                      } else {
                        // Manejo de casos donde las urls no coinciden con el patrón esperado.
                        return 0;
                      }
                    }).map((mv) => ( /* hacer doble mapeo, para acceder a un item especifico */
                      <div key={mv.title} onClick={() => {
                        setUrl({
                          url: url.url == "" ? mv.url : "",
                          type: "movies"
                        })
                      }} className={`w-[45%] h-[50vh] cursor-pointer ${parseInt(mv.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(mv.url.match(/\/([^\/]+)\/$/)![1]) <= 6 ? 'bg-yellow-300' : 'bg-gray-600'} overflow-auto rounded-md p-8`}>
                        <div className="px-6 mb-6 flex flex-col justify-between">
                          <h1 className="text-green-600 mr-8 font-semibold">{mv.title}-Peliculas</h1>
                          {
                            parseInt(mv.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(mv.url.match(/\/([^\/]+)\/$/)![1]) <= 6 ?
                              <div className="py-2 px-6 rounded-md bg-yellow-500">
                                <p className="text-white font-bold">especial</p>
                              </div>
                              : null
                          }
                        </div>

                        <div className="flex flex-col gap-y-6 p-3">
                          <p>skin_color: {mv.director}</p>
                          <p>episodes: {mv.episode_id}</p>
                          <h3>planets: {
                            mv.planets.map((e) => (
                              <p className="text-blue-500">{e}</p>
                            ))
                          }</h3>
                          <h3>starships: {
                            mv.starships.map((e) => (
                              <p className="text-blue-500">{e}</p>
                            ))
                          }</h3>
                          <p>url: {mv.url}</p>
                        </div>
                      </div>
                    ))
                    : null /* si no hay elementos en esa propiedad, no retornar nada */
                }
              </div>
            </div>

            {/* sesion de personajes */}

            <div>
              <h2 className="text-3xl mb-5 text-gray-600 font-semibold">Personajes</h2>
              <div className="flex gap-4 justify-between flex-wrap">
                {
                  laminas.characters.sort((a, b)=>{ // crear el sort para ordenar las laminas segun el id de la url
                    const matchA = a.url.match(/\/([^\/]+)\/$/);
                    const matchB = b.url.match(/\/([^\/]+)\/$/);
                  
                    if (matchA && matchA[1] && matchB && matchB[1]) {
                      return parseInt(matchA[1]) - parseInt(matchB[1]);
                    } else {
                      // Manejo de casos donde las urls no coinciden con el patrón esperado.
                      return 0;
                    }
                  }).map((ch) => (
                    <div key={ch.name} onClick={() => {
                      setUrl({
                        url: url.url == "" ? ch.url : "",
                        type: "characters"
                      })
                    }} className={`w-[45%] h-[50vh] cursor-pointer ${parseInt(ch.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(ch.url.match(/\/([^\/]+)\/$/)![1]) <= 30 ? 'bg-yellow-300' : 'bg-gray-600'} overflow-auto rounded-md p-8`}> {/* aplica la misma condicional para le estilo de la lamina */}
                      <div className="px-12 flex justify-between">
                        <h1 className="text-green-500 font-semibold">{ch.name}-Personajes</h1>
                        {
                          parseInt(ch.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(ch.url.match(/\/([^\/]+)\/$/)![1]) <= 30 ? // si lo que esta dentro de los ultimos dos / es mayor o igual a 1 y menor o igual que 30, entonces se le aplica el especial
                            <div className="py-2 px-6 rounded-md bg-yellow-500">
                              <p className="text-white font-bold">especial</p>
                            </div>
                            : null
                        }
                      </div>
                      <div className="flex flex-col gap-y-6 p-3 overflow-auto">
                        <p>skin_color: {ch.skin_color}</p>
                        <p>starships: {ch.starships}</p>
                        <p>url: {ch.url}</p>
                        <p>eye_color: {ch.eye_color}</p>
                        <p>films: {ch.films}</p>
                        <p>gender: {ch.gender}</p>
                        <p>hair_color: {ch.hair_color}</p>
                        <p>height: {ch.height}</p>
                        <p>homeworld: {ch.homeworld}</p>
                        <p>mass: {ch.mass}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* sesion de naves */}
            <div>
              <h2 className="text-3xl mb-5 text-gray-600 font-semibold">Naves spaciales</h2>
              <div className="flex gap-4 justify-between flex-wrap">
                {
                  laminas.ships.length != 0 ?
                    laminas.ships.sort((a, b)=>{ // crear el sort para ordenar las laminas segun el id de la url
                      const matchA = a.url.match(/\/([^\/]+)\/$/);
                      const matchB = b.url.match(/\/([^\/]+)\/$/);
                    
                      if (matchA && matchA[1] && matchB && matchB[1]) {
                        return parseInt(matchA[1]) - parseInt(matchB[1]);
                      } else {
                        // Manejo de casos donde las urls no coinciden con el patrón esperado.
                        return 0;
                      }
                    }).map((sh) => (
                      <div key={sh.name} onClick={() => {
                        setUrl({
                          url: url.url == "" ? sh.url : "",
                          type: "ships"
                        })
                      }} className={`w-[45%] h-[50vh] cursor-pointer ${sh.url != "Desconocido" && parseInt(sh.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(sh.url.match(/\/([^\/]+)\/$/)![1]) <= 10 ? 'bg-yellow-300' : 'bg-gray-600'} overflow-auto rounded-md p-8`}>
                        <div className="px-12 flex justify-between">
                          <h1 className="text-green-500 font-semibold">{sh.name}- Naves</h1>
                          {
                            sh.url != "Desconocido" && parseInt(sh.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(sh.url.match(/\/([^\/]+)\/$/)![1]) <= 10 ?
                              <div className="py-2 px-6 rounded-md bg-yellow-500">
                                <p className="text-white font-bold">especial</p>
                              </div>
                              : null
                          }
                        </div>

                        <div className="flex flex-col gap-y-6 p-3">
                          <p>consumables: {sh.consumables}</p>
                          <p>films: {
                            sh.films.map((e) => (
                              <p className="text-blue-600">{e}</p>
                            ))
                          }</p>
                          <p>url: {sh.url}</p>
                          <p>length: {sh.length}</p>
                          <p>manufacturer: {sh.manufacturer}</p>
                          <p>model: {sh.model}</p>
                          <p>passengers: {sh.passengers}</p>
                        </div>

                      </div>
                    ))
                    : null
                }
              </div>
            </div>
          </section>
      }

      {
        url.url != "" ?
          <div className="absolute top-[25%] left-[30%] bg-gray-900 rounded-sm py-3 overflow-auto w-[40%] px-12" style={{ backdropFilter: "blur(6px)" }}>
            <section className="flex gap-4 justify-end">
              <button className="text-green-600 hover:text-blue-600 hover:text-xl" onClick={() => setUrl({ url: "", type: "" })}><CloseIcon /></button>
            </section>
            {
              info_lamina?.character != null ?
                Object.entries(info_lamina.character).map(([key, value]) => (
                  <p className="text-white text-xl mb-3">{key}: <span className="text-green-600">{value}</span></p>
                ))
                : info_lamina?.movies != null ?
                  Object.entries(info_lamina.movies).map(([key, value]) => (
                    <p className="text-white text-xl mb-3">{key}: <span className="text-green-600">{value}</span></p>
                  ))
                  :
                  info_lamina?.ships != null ?
                    Object.entries(info_lamina.ships).map(([key, value]) => (
                      <p className="text-white text-xl mb-3">{key}: <span className="text-green-600">{value}</span></p>
                    ))
                    : null
            }
          </div>

          : null
      }
    </div>
  )
}
