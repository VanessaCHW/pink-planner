"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

let user_events = [
  {
    id_: "872aca93-56fd-4229-a135-e69fgjy6824f",
    kind: "calendar-event",
    title: "Lunch with Emma",
    description: "Emma's birthday",
    location: "Some restaurant",
    creator: {
      name: "Vanessa Chan",
      userId: "009",
    },
    start: {
      date: "2021-03-04T05:00:00.000Z",
      time: {
        hours: "02",
        minutes: "00",
        ap: "PM",
        allday: false,
      },
    },
    end: {
      date: "2021-03-04T05:00:00.000Z",
      time: {
        hours: "03",
        minutes: "00",
        ap: "PM",
        allday: false,
      },
    },
    reminders: [],
  },
  {
    id_: "872aca93-56fd-4229-a135-e69fgjy6824f",
    kind: "calendar-event",
    title: "Dentist",
    description: "Cavity reparation",
    location: "Clinic C, 213 Blue Street",
    creator: {
      name: "Vanessa Chan",
      userId: "009",
    },
    start: {
      date: "2021-03-22T05:00:00.000Z",
      time: {
        hours: "06",
        minutes: "00",
        ap: "PM",
        allday: false,
      },
    },
    end: {
      date: "2021-03-22T05:00:00.000Z",
      time: {
        hours: "07",
        minutes: "00",
        ap: "PM",
        allday: false,
      },
    },
    reminders: [],
  },
];

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
    user_events.push(req.body.form);
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

  .get("/events/month/:month", (req, res) => {
    if (req.params > 12) {
      res.status(404).json({
        status: 404,
        message: "There is a problem with your request!",
      });
    } else {
      let test = {};
      let result = user_events.filter(
        (ev) =>
          parseInt(ev.start.date.slice(5, 7).replace("0", "")) - 1 ===
          parseInt(req.params.month)
      );
      res.status(200).json({
        status: 200,
        data: result,
        message: "Month events",
      });
    }
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
