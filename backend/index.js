"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

let user_events = [];

const app = express();
const PORT = 8000;

app
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/", (req, res) => {
    res.status(200).json("Backend server is working");
  })

  .post("/newEvent", (req, res) => {
    user_events.push(req.body);
    console.log(user_events);

    res.status(201).json({
      status: 201,
      data: req.body,
      message: "newEvent successful",
    });
  })

  .get("/allEvents/:id", (req, res) => {
    res.status(200).json({
      status: 200,
      data: user_events,
      message: "All Events",
    });
  })

  .get("*", (req, res) =>
    res.status(404).json({
      status: 404,
      message: "There is a problem with your request!",
    })
  );
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
