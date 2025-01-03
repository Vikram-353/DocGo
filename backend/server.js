import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
// appconfig

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

//midlleware
app.use(express.json());
app.use(cors());
// api endpoint

app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("API WORKING GREAT");
});

app.listen(port, () => console.log("Server Started", port));
