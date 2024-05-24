import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
    async handle(req: Request, res: Response) {
        const {order_id} = req.body;
        const finishOrderService = new FinishOrderService();
        
        try {
            const order = await finishOrderService.execute({order_id});
            return res.json({order});
        } catch (error) {
            return res.status(500).json({error: 'Erro ao finalizar pedido!'});
        }
    }
}

export {FinishOrderController};
