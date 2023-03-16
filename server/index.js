const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;

app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    app.listen(PORT, () => {
      console.log(`Server work on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
