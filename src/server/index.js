const dotenv = require("dotenv");
dotenv.config();

let projectData = {};

var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mockAPIResponse = require("./mockAPI.js");
var Aylien = require("aylien_textapi");

const app = express();
const distPath = path.join(__dirname, "..//..//dist");
/* Dependencies */
/* Middleware*/
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(distPath));

app.get("/", function(req, res) {
  res.sendFile(path.resolve(distPath, "index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(4000, function() {
  console.log("Example app listening on port 4000!");
});

app.get("/test", function(req, res) {
  res.send(mockAPIResponse);
});

//set aylien API credentials
const textApi = new Aylien({
  application_id: process.env.ID,
  application_key: process.env.KEY
});

app.post("/postURL", function(req, res) {
  console.log(req.body);
  const reqURL = req.body.url;
  console.log(reqURL);
  if (textApi) {
    textApi.sentiment(
      {
        url: reqURL
      },
      (error, response) => {
        if (error) {
          res.json({
            msg: "Fail " + error,
            pol: "",
            con: "",
            txt: ""
          });
        } else {
          console.log(response);
          res.json({
            msg: "Success",
            pol: response.polarity,
            con: response.polarity_confidence,
            txt: response.text

          });
        }
      }
    );
  }
});
