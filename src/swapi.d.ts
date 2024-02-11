type People = {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    gender: string,
    homeworld: string,
    films: string[],
    starships: string[],
    url: string
}

type Films = {
    title: string,
    episode: number,
    director: string,
    producer: string,
    characters: string[],
    planents: string[],
    starships: string[],
    url: string
}

type Starship = {
    name: string,
    model: string,
    manufacturer: string,
    length: string,
    passengers: string,
    consumables: string,
    films: string[],
    url: string
}