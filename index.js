const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 2000;
app.use(express.json());
app.use(cors());
const { MONGOURI } = require("./keys");

mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => console.log("Connected to Mongo"));
mongoose.connection.on("error", () => console.log("error"));

require("./models/user");

// mongoose.model("User");

app.use(require("./routes/auth"));

app.use(require("./routes/user"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
