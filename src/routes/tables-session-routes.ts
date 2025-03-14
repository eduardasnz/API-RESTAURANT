import { Router } from "express";
import { TableSessionController } from "../controllers/tables-sections-controller";

const tableSessionRoutes = Router()
const tableSessionController = new TableSessionController()

tableSessionRoutes.post('/', tableSessionController.create)
tableSessionRoutes.get('/', tableSessionController.index)
tableSessionRoutes.patch('/:id', tableSessionController.update)

export { tableSessionRoutes }