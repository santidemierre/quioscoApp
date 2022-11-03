import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

const Categoria = ({categoria}) => {

    const { categoriaActual, handleClickCategoria } = useQuiosco()
    const { nombre, icono, id } = categoria;

  return (
    <div 
        // categoriaActual.id === id esto es para que quede activo al hacer click en la categoria
        className={`${categoriaActual?.id === id ? 'bg-emerald-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-emerald-400 hover:cursor-pointer`} 
        onClick={() => {
                handleClickCategoria(id)
            }}
    >
        <Image 
            width={70}
            height={70}
            src={`/assets/img/icono_${icono}.svg`}
            alt="Imagen Icono"
        />

        <button
            type="button"
            className="text-2xl font-bold"
            onClick={() => {
                handleClickCategoria(id)
            }}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria