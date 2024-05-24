import {Router} from 'express';
import multer from 'multer';

// área de importação dos controllers

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import {CreateProductController} from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController'; 
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import uploadConfig from './config/multer';
import { CreateOrderService } from './services/order/CreateOrderService';
import { DeleteItemController } from './controllers/item/DeleteItemController';
import { ListPendingOrdersController } from './controllers/order/ListPendingOrdersController';
import { FinishOrderController } from './controllers/order/FinishOrderController';
import { ListFinishOrdersController } from './controllers/order/ListFinishOrdersController';
import { CloseOrderController } from "./controllers/order/CloseOrderController";
 
const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);
router.post('/category', isAuthenticated, new CreateCategoryController().handle); //pra validar o token
router.get('/listcategory', isAuthenticated, new ListCategoryController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/deleteorder', isAuthenticated, new RemoveOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.delete('/order/item', isAuthenticated, new DeleteItemController().handle);
router.get('/order/pending', isAuthenticated, new ListPendingOrdersController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);
router.get('/order/finish', isAuthenticated, new ListFinishOrdersController().handle);
router.get('/order/total', isAuthenticated,  new CloseOrderController().handle);

// ROTAS PARA PRODUCT
router.post('/product', isAuthenticated,upload.single('file'), new CreateProductController().handle);
 
// // router.get('/teste', (req:Request, res: Response) => {
// //     return res.json({nome: 'Iasmim'});
// // })

// router.get('/teste', (req:Request, res: Response) => {
//     // throw new Error('erro ao fazer requisição');
//     return res.json({nome: 'Iasmim'});
// })

export{router}