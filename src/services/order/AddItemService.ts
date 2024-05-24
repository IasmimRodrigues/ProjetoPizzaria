import prismaClient from "../../prisma";

interface ItemRequest {
    quantidade: number;
    id_produto: string;
    id_pedido: string;
}

class AddItemService {
    async execute({quantidade, id_produto, id_pedido}:ItemRequest) {
        const item = await prismaClient.item.create({
            data: {
                quantidade: quantidade,
                id_produto: id_produto,
                id_pedido: id_pedido
            }
        })

        return item;
    }
}

export {AddItemService}