import { Router } from "express";

import { tableSessionRoutes } from "./tables-session-routes";
import { productRoute } from "./products-route";
import { tablesRoutes } from "./tables-routes";
import { ordersRoutes } from "./orders-routes";

const routes = Router()

routes.use('/products', productRoute)
routes.use('/tables', tablesRoutes)
routes.use('/table-sessions', tableSessionRoutes)
routes.use('/orders', ordersRoutes)

export { routes }