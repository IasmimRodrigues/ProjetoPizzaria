import { Request, Response } from "express";
import { ListFinishOrdersService } from "../../services/order/ListFinishOrdersService";

class ListFinishOrdersController {
  async handle(req: Request, res: Response) {
    const {date} = req.body;
    const listFinishOrdersService = new ListFinishOrdersService();

    try {
      const order = await listFinishOrdersService.execute({date});
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar pedidos finalizados!" });
    }
  }
}

export { ListFinishOrdersController };
