import prismaClient from "../../prisma";

interface CloseOrderRequest {
    order_id: string;
}

class CloseOrderService {
    async execute({ order_id }: CloseOrderRequest) {
        try {
            // Busca os dados do pedido incluindo os itens e produtos relacionados
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

            // Verifica se o pedido já foi fechado
            if (!order.status) {
                throw new Error(`O pedido ainda não foi fechado`);
            }

            // Calcula o total a pagar
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
