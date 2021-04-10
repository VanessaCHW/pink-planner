const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
process.env.TZ = "America/Toronto";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let user_events = [];

/****************************************
 * Testing the connection
 ***************************************/
const testingDatabase = async () => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected!");
  const db = client.db("pink-planner");
  const collection = db.collection("calendar-events");
  client.close();
  console.log("disconnected!");
};

/****************************************
 * Batch import
 ***************************************/
const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("pink-planner");
    const result = await db
      .collection("calendar-events")
      .insertMany(user_events);
    console.log("SUCCESS", result);
  } catch (err) {
    console.log("ERROR", err.message);
  }
  client.close();
};

/****************************************
 * Get all events
 ***************************************/
const getAllEvents = async () => {
  console.log("Start of server: fetching all user events from Database.");
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("Connected to DB pink-planner.");
    const db = client.db("pink-planner");

    const dbEvents = await db.collection("calendar-events").find().toArray();

    if (dbEvents) {
      user_events = dbEvents;
      console.log("All events have been received.");
    } else {
      console.log("There are 0 events found.");
    }
  } catch (err) {
    console.log("ERROR", err.message);
  }
  client.close();
  console.log("Disconnected from DB pink-planner");
};

/****************************************
 * Add new event
 ***************************************/
const addEvent = async (req, res) => {
  let eventObject = { ...req.body.form, _id: uuidv4() };

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("pink-planner");

    const result = await db
      .collection("calendar-events")
      .insertOne(eventObject);
    assert.equal(1, result.insertedCount);

    /* Update server variable*/
    const dbEvents = await db.collection("calendar-events").find().toArray();
    if (dbEvents) {
      user_events = dbEvents;
      console.log("All events have been received.");
    } else {
      console.log("There are 0 events found.");
    }

    res.status(201).json({ status: 201, message: "Event added to calendar" });
  } catch (err) {
    console.log("ERROR", err.message);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

/****************************************
 * Get events for a selected month
 ***************************************/
const getMonthEvents = (req, res) => {
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
};

/****************************************
 * Get events for a selected date
 ***************************************/
const getDayEvents = (req, res) => {
  // Find all events on that date
  let result = user_events.filter(
    (ev) =>
      ev.start.date.slice(0, 10) === req.params.date.toString().slice(0, 10)
  );

  if (result.length > 1) {
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length - 1; j++) {
        if (result[j + 1].start.time.allday === true) {
          let temp = result[j];
          result[j] = result[j + 1];
          result[j + 1] = temp;
        } else if (
          getTime(result[j].start) > getTime(result[j + 1].start) &&
          result[j + 1].start.time.allday === false
        ) {
          let temp = result[j];
          result[j] = result[j + 1];
          result[j + 1] = temp;
        }
      }
    }
  }

  //Sort events by start time
  res.status(200).json({
    status: 200,
    data: result,
    message: "Date events",
  });
};

/****************************************
 * Delete event
 ***************************************/
const removeEvent = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("pink-planner");

    const result = await db
      .collection("calendar-events")
      .deleteOne({ _id: req.body._id });
    assert.equal(1, result.deletedCount);

    /* Update server variable*/
    const dbEvents = await db.collection("calendar-events").find().toArray();
    if (dbEvents) {
      user_events = dbEvents;
      console.log("All events have been received.");
    } else {
      console.log("There are 0 events found.");
    }

    res.status(201).json({ status: 200, message: "Event removed." });
  } catch (err) {
    console.log("ERROR", err.message);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

/****************************************
 * Edit event
 ***************************************/
const editEvent = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("pink-planner");

    const result = await db
      .collection("calendar-events")
      .replaceOne({ _id: req.body.form._id }, { ...req.body.form });
    assert.equal(1, result.modifiedCount);

    /* Update server variable*/
    const dbEvents = await db.collection("calendar-events").find().toArray();
    if (dbEvents) {
      user_events = dbEvents;
      console.log("All events have been received.");
    } else {
      console.log("There are 0 events found.");
    }

    res.status(201).json({ status: 201, message: "Event updated." });
  } catch (err) {
    console.log("ERROR", err.message);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

/****************************************
 * Helper functions
 ***************************************/
/**For getWeekEvents() */
const toDate = (date_string) => {
  let date = new Date(
    date_string.toString().slice(0, 4),
    date_string.toString().slice(5, 7) - 1,
    date_string.toString().slice(8, 10) - 1
  );
  return date;
};

/** Returns the time in minutes */
const getTime = (ev) => {
  let minutes;
  if (ev.time.hours === "12") {
    minutes =
      ev.time.ap === "AM"
        ? parseInt(ev.time.minutes)
        : 12 * 60 + parseInt(ev.time.minutes);
  } else {
    minutes =
      ev.time.ap === "AM"
        ? parseInt(ev.time.hours) * 60 + parseInt(ev.time.minutes)
        : (parseInt(ev.time.hours) + 12) * 60 + parseInt(ev.time.minutes);
  }
  return minutes;
};

/****************************************
 * Get week events
 ***************************************/
const getWeekEvents = (req, res) => {
  let weekRange = req.body.weekRange;

  // Find all events in the week range & separate all-day events
  let results = [];
  weekRange.map((weekDate) => {
    let allDayEvents = user_events.filter(
      (ev) =>
        ev.start.date.slice(0, 10) === weekDate && ev.start.time.allday === true
    );
    let allEvents = user_events.filter(
      (ev) =>
        ev.start.date.slice(0, 10) === weekDate &&
        ev.start.time.allday === false
    );

    //Sort events by start time
    if (allEvents.length > 1) {
      for (let i = 0; i < allEvents.length; i++) {
        for (let j = 0; j < allEvents.length - 1; j++) {
          if (getTime(allEvents[j].start) > getTime(allEvents[j + 1].start)) {
            let temp = allEvents[j];
            allEvents[j] = allEvents[j + 1];
            allEvents[j + 1] = temp;
          }
        }
      }
    }

    results.push({
      date: weekDate,
      allDayEvents: allDayEvents,
      events: allEvents,
    });
  });

  res.status(201).json({
    status: 200,
    message: "Week events",
    data: { ...req.body, results },
  });
};

module.exports = {
  testingDatabase,
  batchImport,
  addEvent,
  getAllEvents,
  getMonthEvents,
  getDayEvents,
  removeEvent,
  editEvent,
  getWeekEvents,
};
