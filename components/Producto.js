import Image from "next/image"
import { formatearDinero } from '../helpers'
import useQuiosco from "../hooks/useQuiosco"

const Producto = ({producto}) => {

    const {handleSetProducto, handleChangeModal} = useQuiosco()

    // Viene de la BD - schema.prisma
    const {nombre, precio, imagen} = producto

  return (
    <div className='border p-3'>
        <Image 
            src={`/assets/img/${imagen}.jpg`}           
            alt={`Imagen Pedido ${nombre}`}
            width={400}
            height={500}
        /> 

        <div className="p-5">
            <h3 className="text-xl font-bold">{nombre}</h3>
            <p className="mt-5 font-bold text-3xl text-emerald-600 text-center">
                {formatearDinero(precio)}
            </p>

            <button
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 text-white w-full mt-5 p-3 uppercase font-bold rounded-md"
                onClick={() => {
                    handleSetProducto(producto)
                    handleChangeModal()
                }} // Viene del provider
            >
                Agregar
            </button>
        </div>

    </div>
  )
}

export default Producto

/* Las imagenes q tenemos en public, cada una esta mapeada a un registro en la BD  */