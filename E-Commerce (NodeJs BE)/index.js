const express = require("express");
const connectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.port || 3000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/erorrHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

connectDB();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// menit 36.38
