import { Link } from 'react-router-dom'
import user from "../assets/user.png"
import star from "../assets/galaxias.png"

export default function Navbar() {
  return (
    <div className='flex justify-between py-2 px-10 items-center border-b-[1.6px] border-blue-600'>
        <section className='w-[50%] flex justify-between items-center'>
            <div className='flex gap-x-14'>
                <Link to="/"><h3 className='text-gray-700 text-lg hover:text-gray-500'>Mi Album</h3></Link> {/* el primer item del menu se va a redirigir, hacia el home */}
                <Link to="/obtener_laminas"><h3 className='text-gray-700 text-lg hover:text-gray-500'>Obtener Laminas</h3></Link> {/* el segundo item del menu se va a redirigir, hacia el apartado de obtener laminas */}
            </div>
            <div>
                <img src={star} alt="icon" />
            </div>
        </section>
        <section>
            <img src={user} className='w-20 h-20' alt='user' />
        </section>
    </div>
  )
}
