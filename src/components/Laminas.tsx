import { useState } from "react";
import Sobres from "./Sobres";

export default function Laminas({ setMyLaminas, startTime, setStartTime }: {
    startTime: boolean,
    setStartTime: React.Dispatch<React.SetStateAction<boolean>>,
    setMyLaminas: React.Dispatch<React.SetStateAction<{
        movies: Films[];
        characters: People[];
        ships: Starship[];
    }>>
}) {

    const [countsobres, setCountSobres] = useState(Array.from({ length: 4 }, (_, i) => i + 1)) // crear stado para manejar los sobres de una forma mas optima,
    // ademas de poderlos eliminar

    return (
        <div className="flex justify-between p-7">
            {
                countsobres.map((_, index) => (
                    <Sobres index={index} setStartTime={setStartTime} startTime={startTime} setCountsobres={setCountSobres} setMyLaminas={setMyLaminas} /> /* pasar el set del count sobre, para manejarlo una ves se le de click al sobre */
                ))  /* hacer un mapeo para los 4 sobres con el estado, para luego poder eliminarlos */

            }
        </div>
    )
}
