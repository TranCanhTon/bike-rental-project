require("dotenv").config();
const cors = require("cors");

// express
const express = require("express");
const app = express();
const path = require("path");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// other packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

//midleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bikes", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

if (process.env.NODE_ENV === "production") {
  const __dirnamePath = path.resolve();
  app.use(express.static(path.join(__dirnamePath, "../client/build")));

  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirnamePath, "../client/build", "index.html"));
  // });
} else {
  app.get("/", (req, res) => {
    res.json("API is running...");
  });
}

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.set("trust proxy", 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 60 }));

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
