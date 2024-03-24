// external imports
import express, { Express } from "express";
import dotenv from "dotenv";
// config imports
import connectToDb from "./config/db";
import paths from "./config/paths";
// module imports
import authRoutes from "./routes/auth";
import handleError from "./middlewares/handleError";

dotenv.config();
connectToDb();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(paths.auth.base, authRoutes);
app.use(handleError);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
