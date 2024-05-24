import prismaClient from "../../prisma";

interface CloseOrderRequest {
    order_id: string;
}

class CloseOrderService {
    async execute({ order_id }: CloseOrderRequest) {
        try {
            const order = await prismaClient.pedido.findUnique({
                where: {
                    id: order_id,
                },
                include: {
                    items: {
                        include: {
                            produto: true,
                        },
                    },
                },
            });

            if (!order) {
                throw new Error(`Pedido não encontrado`);
            }

            if (!order.status) {
                throw new Error(`O pedido ainda não foi fechado`);
            }

            const total = order.items.reduce((acc, item) => {
                return acc + item.quantidade * parseFloat(item.produto.preco);
            }, 0);

            return { order, total };
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }
}

export { CloseOrderService };
