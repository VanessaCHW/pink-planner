"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  testingDatabase,
  batchImport,
  addEvent,
  getAllEvents,
  getMonthEvents,
  getDayEvents,
  removeEvent,
  editEvent,
  getWeekEvents,
} = require("./handlers");

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
  .use(morgan("dev"))
  .use(express.json())

  .get("/testDB", testingDatabase)
  .get("/import", batchImport)

  //.get("/allEvents", getEvents)
  .get("/events/month/:month", getMonthEvents)
  .post("/newEvent", addEvent)
  .get("/events/date/:date", getDayEvents)
  .delete("/event", removeEvent)
  .put("/editEvent", editEvent)
  .post("/events/week", getWeekEvents)

  /***********************************************
   ***********************************************/
  .get("*", (req, res) =>
    res.status(404).json({
      status: 404,
      message: "There is a problem with your request!",
    })
  );

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

getAllEvents();
