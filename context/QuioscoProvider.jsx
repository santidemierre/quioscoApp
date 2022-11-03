import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]) // Para obtener las categorias en el state
    const [categoriaActual, setCategoriasActual] = useState({}) // Para detectar a qué categoria estamos dando click
    const [producto, setProducto] = useState({}) // Seteamos los productos xq ya tenemos el filtro hecho más abajo
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([]) // Para agregar elementos al carrito desde el modal. // VER VIDEO 362
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    // Para que quede 
    useEffect(() => {
        setCategoriasActual(categorias[0])
    }, [categorias])
    
    // Calcular el Total
    useEffect(() => {
      const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
      setTotal(nuevoTotal)
    }, [pedido])
    

    const handleClickCategoria = id => {
    // COMO OBTENER LA CATEGORIA ACTUAL. Si cat.id, que son las categorias que tenemos en el state, es === al id, esa es la categoria actual. Me trae el objeto completo
        const categoria = categorias.filter( cat => cat.id === id )
        setCategoriasActual(categoria[0]) // Como filter es un array method, le pongo el [0] para que acceda a ese arreglo

        // Para que al hecer click en las categorias desde cualquier PAGINA, lo lleve al MENU
        router.push("/")
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }
 
    // VER VIDEO 362 ...producto es un objeto nuevo SIN las propiedades categoriaId, imagen
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)) {
            // Si existe, vamos a actualizar con la cantidad que el usuario coloque            
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)

            toast.success('Guardado correctamente') // Toast para guardado

        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido') // Toast para agregado
        }

        setModal(false) // Para que se cierre el modal al darle click al boton "agregar al pedido o guardar cambios"        
    } 

    const handleEditarCantidades = id => {
        const productoActualizado = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizado[0]) // Al ser filter un array method tenemos que agregarle [0]

        setModal(!modal)
    }

    const handleElimiarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            // Resetear la app una vez que se envie el pedido:
            setCategoriasActual(categorias[0]) // Reiniciamos la categoria actual
            setPedido([]) 
            setNombre('')
            setTotal(0)

            // Para enviarle un mensaje que el pedido fue enviado
            toast.success('Pedido realizado correctamente')
            // Para llevarlo a la pagina de inicio
            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                handleChangeModal,
                modal,
                handleAgregarPedido, // VER VIDEO 362
                pedido,
                handleEditarCantidades,
                handleElimiarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext