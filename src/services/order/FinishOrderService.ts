import prismaClient from "../../prisma";

interface FinishOrderRequest {
    order_id: string;
}

class FinishOrderService {
    async execute({order_id}: FinishOrderRequest) {
        try {
            const order = await prismaClient.pedido.update({
                where: {
                    id:order_id,
                },
                data: {
                    status: true,
                },
            });
            return order;
        } catch (error) {
            throw new Error('Erro ao finalizar pedido!');
        }
    }
}

export { FinishOrderService };
