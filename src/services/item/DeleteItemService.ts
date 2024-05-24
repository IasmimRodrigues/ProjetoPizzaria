import prismaClient from "../../prisma";

interface ItemRequest {
    id_item: string;
}

class DeleteItemService {
    async execute({id_item}:ItemRequest) {
        const item = await prismaClient.item.delete({
            where: {
                id: id_item,
            }
        })
        return {
            message: 'Item deletado com sucesso!'
        }
    }
}

export {DeleteItemService};