import { Request, Response } from "express";
import { DeleteItemService } from "../../services/item/DeleteItemService";

class DeleteItemController {
    async handle(req: Request, res: Response) {
        const {id_item} = req.body;
        const deleteItemService = new DeleteItemService();

        try {
            const item = await deleteItemService.execute({id_item});
            return res.json(item);
        } catch (error) {
            return res.status(500).json({error: 'Erro ao deletar item!'})
        }
    }
}

export {DeleteItemController};