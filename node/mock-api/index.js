const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
