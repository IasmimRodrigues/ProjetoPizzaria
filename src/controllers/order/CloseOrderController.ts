import { Request, Response } from "express";
import { CloseOrderService } from "../../services/order/CloseOrderService";

class CloseOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body; 
        const closeOrderService = new CloseOrderService();
        
        try {
            const result = await closeOrderService.execute({ order_id: order_id });
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ error: `${error.message}` });
        }
    }
}

export { CloseOrderController };
