import prismaClient from "../../prisma";

interface PendingOrdersRequest {
  date: string;
}

class ListPendingOrdersService {
  async execute({date}: PendingOrdersRequest) {
    const order = await prismaClient.pedido.findMany({
      where: {
        status: false, 
      }
    })
    const filteredOrders = order.filter(o => {
      const orderDate = o.criado_em.toISOString().split('T')[0];
      return orderDate === date;
  })

  return filteredOrders;
  }
}

export { ListPendingOrdersService };
