import error from "../assets/404.png"

export default function Album({laminas}: {laminas: {
  movies: Films[];
  characters: People[];
  ships: Starship[]; /* implementar los tipos predefinidos en el archivo .d.ts */
}}) {


  return (
    <div className={`flex ${laminas.characters.length == 0  && laminas.movies.length == 0 && laminas.ships.length == 0  ? 'justify-center items-center p-20' : 'p-10'}`}>
      {
        laminas.characters.length == 0 && laminas.movies.length == 0 && laminas.ships.length == 0 ? /* si no hay laminas almacenadas, mostrar imagen de 404 */
          <img src={error} alt="404" />
        : /* de lo contrario mostrar todos los items, con los respectivos datos */
        <section className="gap-y-10 flex flex-col">
          <div>
            <h2 className="text-3xl text-gray-600 font-semibold">Peliculas</h2>
            {
                laminas.movies.length != 0 ? 
                  laminas.movies.map((mv)=>( /* hacer doble mapeo, para acceder a un item especifico */
                    <h1 className="text-green-500">{mv.title}</h1>
                  ))
                : null /* si no hay elementos en esa propiedad, no retornar nada */
            }
          </div>
          <div>
            <h2 className="text-3xl text-gray-600 font-semibold">Personajes</h2>
            {
                laminas.characters.map((mv)=>(
                  <h1 className="text-green-500">{mv.name}</h1>
                ))
            }
          </div>
          <div>
            <h2 className="text-3xl text-gray-600 font-semibold">Naves spaciales</h2>
            {
                laminas.ships.length != 0 ?
                laminas.ships.map((mv)=>(
                  <h1 className="text-green-500">{mv.name}</h1>
                ))
                : null
            }
          </div>
        </section>
      }
    </div>
  )
}
