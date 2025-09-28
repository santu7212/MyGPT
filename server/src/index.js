import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { app } from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
await connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error;
      });
    });
  })
  .catch((error) => {
    console.log("mongo db connection failed !!! ", error);
  });
