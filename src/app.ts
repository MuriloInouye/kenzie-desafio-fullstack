import express from "express";
import indexRoutes from "./routes";

const app = express();

app.use(express.json());

indexRoutes(app)

export default app;
