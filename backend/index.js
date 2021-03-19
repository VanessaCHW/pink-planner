const express = require("express");
const app = express();
const PORT = 8000;

app
  .get("/", (req, res) => {
    res.send("Backend server is working");
  })

  .post("/newEvent", (req, res) => {
    res.send("Post!");
  });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
