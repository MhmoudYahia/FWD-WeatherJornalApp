//use express framwork
const express = require("express");
const app = express();

//porting
const port = 1444;

//body-parser dependency
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors dependency
const cors = require("cors");
app.use(cors());

//link with the clint-code
app.use(express.static("./website"));


app.listen(port, () => {
  console.log(`server is porting on ${port}`);
});
