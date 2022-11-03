// IMPORTANTE VER LOS VIDEOS 360 A 364

import { useState, useEffect } from "react" // Va a ser local de este componente
import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers"

const ModalProducto = () => {

    const {producto, handleChangeModal, handleAgregarPedido, pedido} = useQuiosco()
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)

    useEffect(() => {
      // Comprobamos si el modal actual esta en el pedido
        if(pedido.some((pedidoState) => pedidoState.id === producto.id)) {

            const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)
            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
    } 
    }, [producto, pedido]) // Pasamos como referencia el producto actual
    

  return (
    <div className="md:flex gap-10">
        <div className="md:w-1/3">
            <Image 
                width={300}
                height={400}
                alt={`imagen producto ${producto.nombre}`}
                src={`/assets/img/${producto.imagen}.jpg`}
            />
        </div>

        <div className="md:w-2/3">

            <div className="flex justify-end">
                <button
                    onClick={handleChangeModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </button>
            </div>

            <h1 className="text-3xl font-bold mt-5 text-center">{producto.nombre}</h1>
            <p className="mt-5 font-black text-4xl text-emerald-500 text-center">
                {formatearDinero(producto.precio)}
            </p>     

            <div className="flex gap-4 mt-5 justify-center">
                <button
                    type="button" // Porque x default siempre va a ser "submit"
                    onClick={() => {
                        if(cantidad <= 1) return
                        setCantidad(cantidad - 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                <p className="text-3xl">{cantidad}</p>

                <button
                    type="button" // Porque x default siempre va a ser "submit"
                    onClick={() => {
                        if(cantidad >= 5) return
                        setCantidad(cantidad + 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <button
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 text-white w-full mt-5 p-3 uppercase font-bold rounded-md"
                onClick={() => handleAgregarPedido({...producto, cantidad})} // VER VIDEO 362
            >
                {edicion ? 'Guardar Cambios' : "Añadir al Pedido"}
            </button>

        </div>
    </div>
  )
}

export default ModalProducto