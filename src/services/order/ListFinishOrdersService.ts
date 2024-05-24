import prismaClient from "../../prisma";

interface FinishOrdersRequest {
  date: string;
}

class ListFinishOrdersService {
  async execute({date}: FinishOrdersRequest) {
    const order = await prismaClient.pedido.findMany({
      where: {
        status: true
      }
    });

    const filteredOrders = order.filter(o => {
        const orderDate = o.criado_em.toISOString().split('T')[0];
        return orderDate === date;
    })

    return filteredOrders;
  }
}

export { ListFinishOrdersService };
