const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html"); // Explicitly set the Content-Type
  res.send(`<h1>This is home page</h1>
    <button onclick="alert('clicked')">About</button>`);
});
app.listen(PORT, console.log("Server is live on", PORT));
