import Album from './Album'

export default function Home({laminas}: {laminas: {
  movies: Films[];
  characters: People[];
  ships: Starship[];
}}) /* recibir el stado laminas como prop, para acceder a toda la informacion, de las laminas guardadas */ {
  return (
    <div>
        <Album laminas={laminas} /* usar album para mostrar todas las laminas, y pasarle esta como prop */ /> 
    </div>
  )
}
