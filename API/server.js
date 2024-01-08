require("dotenv").config();

// Server config
const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload());
app.use(cors());

// Config static dir

const path = require("path");
const staticDir = path.join(__dirname, "./uploads");

app.use("/uploads", express.static(staticDir));

// Root
const router = require("./routes/router");
const { handleErrors, notFound } = require("./middlewares/-export");

app.use(router);
app.use(notFound);
app.use(handleErrors);

// Server connection
const { HOST, PORT } = process.env;
const chalk = require("chalk");

app.listen(PORT, () => {
  console.log(chalk.blue(`API Express on ${HOST}:${PORT}`));
});
