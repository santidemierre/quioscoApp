import { useEffect, useCallback } from "react" // Ver video 376 por useCallback
import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import {formatearDinero} from '../helpers'
 
export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()

    // Retorna true o flase
    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3
    }, [pedido, nombre])

    useEffect(() => {
      comprobarPedido()
    }, [pedido, comprobarPedido]) // Pasamos pedido para que este escuchando los cambios 
    
    return (
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label
                        htmlFor="nombre" 
                        className="block uppercase text-slate-800 font-bold text-xl">
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-3 rounded-sm"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: {""} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>

                <div className="mt-5">
                    <input 
                        type="submit"
                        value="Confirmar Pedido"
                        className={`${comprobarPedido() ? 'bg-sky-200' : 'bg-sky-800 hover:bg-sky-900'} w-full lg:w-auto px-5 py-2 rounded-sm uppercase font-bold text-white text-center cursor-pointer`}
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
         </Layout>
    )
}