import express from "express";
import { routes } from "./routes"
import { ErrorHandling } from "./middlewares/error-handlerling";

const app = express();

const PORT = 3000;
app.use(express.json());
app.use(routes)

// Middleware
app.use(ErrorHandling);

app.listen(PORT, () => console.log("Server running!🚀"));