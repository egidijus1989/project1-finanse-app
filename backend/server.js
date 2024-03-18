const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 9000;
const DB = process.env.MONGO_DB.replace(
  "<password>",
  process.env.MONGO_PASSWORD
);

//Server///////////////////////////////////////
mongoose
  .connect(DB)
  .then((con) => {
    console.log("Server connected to Mongo DB");
  })
  .catch((err) => {
    console.log(`Something went wrong ${err.message}`);
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
