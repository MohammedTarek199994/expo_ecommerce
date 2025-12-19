import express from "express";
import path from "path";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(clerkMiddleware()); // add auth object under the request => req.auth

const __dirname = path.resolve();

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

// make our app ready to deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}
connectDB();
app.listen(ENV.PORT, () => {
  console.log(`Example app listening on port ${ENV.PORT}!`);
});

// const startServer = async () => {
//   await connectDB();
//   app.listen(ENV.PORT, () => {
//     console.log(`Example app listening on port ${ENV.PORT}!`);
//   });
// };

// startServer();
