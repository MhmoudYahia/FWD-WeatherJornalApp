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

let projectData = {};

//GEt-root
app.get("/getData", (req, res) => {
  res.send(projectData);
  console.log(projectData);
  console.log(5);
});

//POST-root
app.post("/addData", (req, res) => {
  const newData = req.body;
  projectData.date = newData.date;
  projectData.temperature = (Number(newData.temperature) - 273).toFixed(2);
  projectData.userRes = newData.userRes;
  //   console.log(projectData);
});

app.listen(port, () => {
  console.log(`server is porting on ${port}`);
});
