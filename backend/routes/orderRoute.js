import express from "express"
import authMiddlware from "../middleware/auth.js"
import { listOrders, placeOrder, updateStatus, userorders, verifyOrder } from "../controllers/orderController.js"


const orderRouter = express.Router();


orderRouter.post("/place", authMiddlware, placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.get("/userorders",authMiddlware,userorders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);








export default orderRouter;