"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

let user_events = [
  {
    id_: "872aca93-56fd-6158-a135-e69fgjy6824f",
    kind: "calendar-event",
    title: "Camping Trip",
    description: "Camping Mont Tremblant",
    location: "Parc du Mont Tremblant, Lac superieur",
    creator: {
      name: "Vanessa Chan",
      userId: "009",
    },
    start: {
      date: "2021-03-26T05:00:00.000Z",
      time: {
        hours: "06",
        minutes: "00",
        ap: "PM",
        allday: false,
      },
    },
    end: {
      date: "2021-03-28T05:00:00.000Z",
      time: {
        hours: "06",
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
      date: "2021-03-20T05:00:00.000Z",
      time: {
        hours: "06",
        minutes: "00",
        ap: "PM",
        allday: false,
      },
    },
    end: {
      date: "2021-03-20T05:00:00.000Z",
      time: {
        hours: "07",
        minutes: "00",
        ap: "PM",
        allday: false,
      },
    },
    reminders: [],
  },
  {
    id_: "872aca93-56fd-8561-a135-e69fgjy6824f",
    kind: "calendar-event",
    title: "Hairdresser",
    description: "Redo coloration",
    location: "hair Academy, 353 rue Orange",
    creator: {
      name: "Vanessa Chan",
      userId: "009",
    },
    start: {
      date: "2021-03-20T05:00:00.000Z",
      time: {
        hours: "08",
        minutes: "00",
        ap: "PM",
        allday: false,
      },
    },
    end: {
      date: "2021-03-20T05:00:00.000Z",
      time: {
        hours: "09",
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

  /***********************************************
   * CREATE NEW EVENT
   ***********************************************/
  .post("/newEvent", (req, res) => {
    user_events.push(req.body.form);
    console.log(user_events);

    res.status(201).json({
      status: 201,
      data: req.body,
      message: "newEvent successful",
    });
  })

  /***********************************************
   * GET ALL USER EVENTS
   ***********************************************/
  .get("/allEvents/:id", (req, res) => {
    res.status(200).json({
      status: 200,
      data: user_events,
      message: "All Events",
    });
  })

  /***********************************************
   * GET ALL USER EVENTS THIS **MONTH**
   ***********************************************/
  .get("/events/month/:month", (req, res) => {
    if (parseInt(req.params) > 12) {
      res.status(404).json({
        status: 404,
        message: "Month invalid",
      });
    } else {
      let dates = [];
      let result = user_events.filter(
        (ev) =>
          parseInt(ev.start.date.slice(5, 7).replace("0", "")) - 1 ===
          parseInt(req.params.month)
      );
      if (result.length > 0) {
        //Get all dates
        result.map((ev) => {
          if (!dates.includes(ev.start.date)) {
            dates.push(ev.start.date);
          }
        });
        //Sort dates
        for (let i = 0; i < dates.length; i++) {
          for (let j = 0; j < dates.length - 1; j++)
            if (dates[j] > dates[j + 1]) {
              let temp = dates[j];
              dates[j] = dates[j + 1];
              dates[j + 1] = temp;
            }
        }

        /**Create a new object with dates and events
         * { date: date,
         *  events: []} */
        let resultsSortedByDate = [];
        dates.map((date) => {
          let allEvents = [];
          result.map((meeting) => {
            if (meeting.start.date === date) {
              allEvents.push(meeting);
            }
          });
          resultsSortedByDate.push({ date: date, events: allEvents });
        });

        res.status(200).json({
          status: 200,
          data: resultsSortedByDate,
          message: "Month events",
        });
      } else {
        //If there are no events this month
        //send an empty array
        res.status(200).json({
          status: 200,
          data: [],
          message: "Month events",
        });
      }
    }
  })

  /***********************************************
   * GET ALL USER EVENTS THIS **DAY**
   ***********************************************/
  .get("/events/date/:date", (req, res) => {
    // Parse Date
    let searchedDate = new Date(
      req.params.date.slice(0, 4),
      req.params.date.slice(5, 7) - 1,
      req.params.date.slice(8, 10)
    );

    // Find all events on that date
    let result = user_events.filter(
      (ev) =>
        ev.start.date.slice(0, 10) === req.params.date.toString().slice(0, 10)
    );

    //Sort events by start time

    res.status(200).json({
      status: 200,
      data: result,
      message: "Date events",
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
