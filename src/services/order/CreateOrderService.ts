import prismaClient from "../../prisma";

interface OrderRequest {
    mesa: number;
    nome: string;
}

class CreateOrderService {
    async execute({mesa,nome}:OrderRequest) {
        const order = await prismaClient.pedido.create({
            data:{
                mesa:mesa,
                nome:nome
            }
        })
        return order;
    }
}

export {CreateOrderService}