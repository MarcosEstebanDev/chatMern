import  express  from "express";
import controller from "../controllers/message.js";

const router = express.Router()


//Rutas de la applicacion

router.post('/save',controller.save)
router.get('/messages', controller.getMessages)

export default router