import { categorias } from "./data/categorias"
import { productos } from "./data/productos"
import { PrismaClient } from "@prisma/client" // Sirve para realizar operaciones en la base de datos

const prisma = new PrismaClient()

const main = async () : Promise<void> => {
    try {
        // Dentro del modelo de categoria va a agregar todas las categorias que estan en data
        await prisma.categoria.createMany({
            data: categorias
        })

        // Dentro del modelo de producto va a agregar todas los productos que estan en data
        await prisma.producto.createMany({
            data: productos
        })
    } catch (error) {
        console.log(error)
    }
}
main()