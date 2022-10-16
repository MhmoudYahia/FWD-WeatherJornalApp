
//personal api key
const personalKey = "&appid=2ad070d9e09ca7a503ec39544c161e29&units=metric";

//Global variables
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate =
  Number(d.getMonth()) + 1 + ":" + d.getDate() + ":" + d.getFullYear();

const getData = async (baseUrl, zipCode = "", personalKey = "") => {
  const response = await fetch(baseUrl + zipCode + personalKey);

  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

//post data
const postData = async (path, data) => {
  const response = await fetch(path, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const resData = await response.json();
    return resData;
  } catch (err) {
    console.log("Error", err);
  }
};

const performAction = () => {
  // inputs
  const zipCode = document.getElementById("zip").value;
  const userResponse = document.getElementById("feel").value;

  getData(baseUrl, zipCode, personalKey).then((data) => {
    // post data to my server
    postData("/addData", {
      date: newDate,
      temperature: data.main.temp,
      userRes: userResponse,
    });
    updateUI();
  });

  document.getElementById("zip").value = "";
  document.getElementById("feel").value = "";
};

// on clicking generate button
document.getElementById("generate").addEventListener("click", performAction);

//get data from server

const updateUI = async () => {
  const response = await fetch("/getData");
  try {
    const data = await response.json();

    //assign data to weather holders
    document.querySelector(".date").textContent = data.date;
    document.querySelector(".temp").innerHTML =
      data.temperature + " <span><sup>o</sup>C</span>";
    document.querySelector(".content").textContent = data.userRes;
  } catch (err) {
    console.log("Error", err);
  }
};
