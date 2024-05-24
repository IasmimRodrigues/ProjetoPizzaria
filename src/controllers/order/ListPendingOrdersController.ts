import { Request, Response } from "express";
import { ListPendingOrdersService } from "../../services/order/ListPendingOrdersService";

class ListPendingOrdersController {
  async handle(req: Request, res: Response) {
    const {date} = req.body;
    const listPendingOrdersService = new ListPendingOrdersService();

    try {
      const order = await listPendingOrdersService.execute({date});
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar pedidos não finalizados!" });
    }
  }
}

export { ListPendingOrdersController };
