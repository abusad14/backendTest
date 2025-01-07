const express = require("express");
const app = express();
const { connect } = require("mongoose");
const Comments = require("./model/userSchema");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

connect(MONGO_URI)
  .then(() => {
    console.log("Mongodb adtlas connected");
  })
  .catch((err) => {
    console.log("Mongodb connection error", err);
  });

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html"); // Explicitly set the Content-Type
  res.send(
    `<h1>This is home page</h1><h2>This is added on 7 January</h><a href="/about">About</a>`
  );
});
app.get("/about", (req, res) => {
  res.setHeader("Content-Type", "text/html"); // Explicitly set the Content-Type
  res.send(
    `<h1>Welcome to About page</h1><h2>This is also added on 7 January</h><a href="/">Home</a>`
  );
});
app.get("/data", async (req, res) => {
  try {
    // Fetch 5 comments from the 'comments' collection
    const data = await Comments.find().limit(2).lean();

    // Create a dynamic HTML response to display the data
    let htmlContent = `
      <html>
        <head>
          <title>Comments</title>
        </head>
        <body>
          <h1>Comment Data</h1>
          <ul>`;

    // Loop through the data and create list items for each comment
    data.forEach((comment) => {
      htmlContent += `
        <li>
          <strong>Name:</strong> ${comment.name} <br />
          <strong>Email:</strong> ${comment.email} <br />
          <strong>Comment:</strong> ${comment.text}
        </li>`;
    });

    htmlContent += `</ul></body></html>`;

    // Send the HTML response to the user
    res.status(200).send(htmlContent);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});
app.listen(PORT, console.log("Server is live on", PORT));
