import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import swaggerUI from 'swagger-ui-express'
import authRoutes from "./routes/auth.js";
import YAML from 'yamljs'
// import categoryRoutes from "./routes/category.js";
// import productRoutes from "./routes/product.js";
import cors from "cors";
const swaggerDoc =YAML.load('./swagger.yaml')

dotenv.config();

const app = express();
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// router middleware
app.use("/api/v1", authRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
