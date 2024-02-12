import { Dispatch } from "react";

export default function Card({ laminas, setSobre, setMylaminas }: {
    laminas: {
        movies: Films[];
        characters: People[];
        ships: Starship[];
    },
    setMylaminas: Dispatch<React.SetStateAction<{
        movies: Films[];
        characters: People[];
        ships: Starship[];
    }>>,
    setSobre: Dispatch<React.SetStateAction<{
        movies: Films[];
        characters: People[];
        ships: Starship[];
    }>>
}) { // recibe las laminas, para hacerle un mapeo a cada categoria.

    return (
        <div>
            <section className="my-3 flex justify-center">
                <button onClick={()=>setSobre({ //crear boton para ignorar el sobre, y abrir otro
                    movies: [],
                    characters: [],
                    ships: []
                })} className=" bg-gradient-to-t text-gray-300 to-slate-800 from-green-600 rounded-md px-6 py-2">Descartar sobre</button>
            </section>
            {laminas != null ? (
                <div className="grid grid-cols-1 gap-4">
                    <section className="flex gap-2">
                        {laminas.characters.map((ch, index) => (
                            <div key={ch.name} className={`${parseInt(ch.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(ch.url.match(/\/([^\/]+)\/$/)![1]) <= 30 ? 'bg-yellow-300' : 'bg-gray-600'} overflow-auto rounded-md p-8`}> {/* aplica la misma condicional para le estilo de la lamina */}
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
                                <div className="w-full flex justify-between my-4">
                                    <button onClick={() => {
                                        setMylaminas((prev) => {
                                            const newlam: { movies: Films[]; characters: People[]; ships: Starship[]; } = { movies: [...prev.movies], characters: [...prev.characters], ships: [...prev.ships] };
                                            newlam.characters.push(ch); //se almacena el personaje
                                            return newlam;
                                        }) // aqui se guarda en el stado global de las laminas
                                        setSobre((sb) => {
                                            sb = { characters: sb.characters.filter((_, indexch) => indexch != index), movies: [...sb.movies], ships: [...sb.ships] }
                                            return sb
                                        }) // luego se compara en un filter, para posteriormente, eliminar la lamina de los temporales
                                    }} className="bg-green-700 p-3 text-white rounded-sm">Añadir al album</button>
                                    <button onClick={() => {
                                        setSobre((sb) => {
                                            sb = { characters: sb.characters.filter((_, indexch) => indexch != index), movies: [...sb.movies], ships: [...sb.ships] }
                                            return sb
                                        }) // se repite el proceso cuando se le da a descartar
                                    }} className="bg-red-700 p-3 text-white rounded-sm">Descartar</button>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="my-2 flex gap-2">
                        {laminas.movies.map((mv, index) => (
                            <div key={mv.title} className={`${parseInt(mv.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(mv.url.match(/\/([^\/]+)\/$/)![1]) <= 6 ? 'bg-yellow-300' : 'bg-gray-600'} overflow-auto rounded-md p-8`}>
                                <div className="px-12 flex justify-between">
                                    <h1 className="text-green-500 mr-8 font-semibold">{mv.title}-Peliculas</h1>
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
                                <div className="w-full flex justify-between">
                                    <button onClick={() => {
                                        setMylaminas((prev) => {
                                            const newlam: { movies: Films[]; characters: People[]; ships: Starship[]; } = { movies: [...prev.movies], characters: [...prev.characters], ships: [...prev.ships] };
                                            newlam.movies.push(mv);
                                            return newlam;
                                        })

                                        setSobre((sb) => {
                                            sb = { characters: [...sb.characters], movies: sb.movies.filter((_, indexch) => indexch != index), ships: [...sb.ships] }
                                            return sb
                                        })

                                    }} className="bg-green-700 p-3 text-white rounded-sm">Añadir al album</button>
                                    <button onClick={() => {
                                        setSobre((sb) => {
                                            sb = { characters: [...sb.characters], movies: sb.movies.filter((_, indexch) => indexch != index), ships: [...sb.ships] }
                                            return sb
                                        })
                                    }} className="bg-red-700 p-3 text-white rounded-sm">Descartar</button>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="my-2 flex gap-2">
                        {laminas.ships.map((sh, index) => (
                            <div key={sh.name} className={`w-[30%] ${sh.url != "Desconocido" && parseInt(sh.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(sh.url.match(/\/([^\/]+)\/$/)![1]) <= 10 ? 'bg-yellow-300' : 'bg-gray-600'} overflow-auto rounded-md p-8`}>
                                <div className="px-12  flex justify-between">
                                    <h1 className="text-green-500 font-semibold">{sh.name}- Naves</h1>
                                    {
                                        sh.url != "Desconocido" && parseInt( sh.url.match(/\/([^\/]+)\/$/)![1]) >= 1 && parseInt(sh.url.match(/\/([^\/]+)\/$/)![1]) <= 10 ?
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
                                <div className="w-full flex justify-between ">
                                    <button onClick={() => {
                                        setMylaminas((prev) => {
                                            const newlam: { movies: Films[]; characters: People[]; ships: Starship[]; } = { movies: [...prev.movies], characters: [...prev.characters], ships: [...prev.ships] };
                                            newlam.ships.push(sh);
                                            return newlam;
                                        })

                                        setSobre((sb) => {
                                            sb = { characters: [...sb.characters], movies: [...sb.movies], ships: sb.ships.filter((_, indexch) => indexch != index) }
                                            return sb
                                        })
                                    }} className="bg-green-700 p-3 text-white rounded-sm">Añadir al album</button>
                                    <button onClick={() => {
                                        setSobre((sb) => {
                                            sb = { characters: [...sb.characters], movies: [...sb.movies], ships: sb.ships.filter((_, indexch) => indexch != index) }
                                            return sb
                                        })
                                    }} className="bg-red-700 p-3 text-white rounded-sm">Descartar</button>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            ) : null}
        </div>
    )
}
