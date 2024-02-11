import { Dispatch, SetStateAction, useState } from "react"

export default function Login({setIsLogin}: {setIsLogin: Dispatch<SetStateAction<boolean>>}) {
    const [user, setUser] = useState<string>(""); // crear stado para almacenar el nombre de usuario, como un string
    const [password, setPassword] = useState<string>("");


    const Login = (e: React.FormEvent<HTMLFormElement> | undefined) =>{
        e?.preventDefault();
        setIsLogin(true); // cambiara uno de los stados pricipales cuando se de click
        localStorage.setItem("name", user); // guardara el nombre y el password, para simular un login real
        localStorage.setItem("password", password);
    }

  return (
    <form onSubmit={Login} /* cuando se le de al boton de login llamara al metodo login */ className='flex flex-col flex-wrap items-center gap-y-14 w-[30%] absolute top-[20%] left-[30%] align-middle'>
        <section className='gap-y-8 flex flex-col w-[80%]'>
            <input required onChange={(e)=>setUser(e.target.value) /* cada vez que el input cambie, el stado cambiara su valor */} type="text" className='border-b-[1.5px] border-blue-400 bg-gray-800 rounded-md p-2 text-white' placeholder='Write you user' />
            <input required onChange={(e)=>setPassword(e.target.value)} type="password" className='border-b-[1.5px] border-blue-400 bg-gray-800 rounded-md p-2 text-white' placeholder='Write password' />
        </section>
        <section className="w-[70%]">
            <button disabled={user == "" && password == "" /* mientras que el user y password stado, esten vacios el boton de enviar estara deshabilitado */}  type="submit" className='text-white w-full cursor-pointer bg-gradient-to-r to-black from-blue-600 rounded-md p-3'>Login</button>
        </section>
    </form>
  )
}
