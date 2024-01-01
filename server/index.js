require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const Form = require("./schemas");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/dist/");

app.use(express.static(buildPath));

mongoose.connect(process.env.VITE_MONGO_URI, {});
mongoose.connection.on("error", (error) =>
  console.error("MongoDB Connection Error:", error)
);

// Create a route for sending emails
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(`${err} and ${__dirname}`);
      }
    }
  );
});

app.post("/api/form/:type/:apiKey", async (req, res) => {
  const key = req.params["apiKey"];

  if (key !== process.env.API_KEY) {
    res.status(500).send("unauthorized");
    return;
  }

  const type = req.params["type"];
  const { firstName, lastName, issue, phoneNumber, email, address } = req.body;

  try {
    const newEntry = Form({
      status: "pending",
      type,
      firstName,
      lastName,
      issue,
      phoneNumber,
      email,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
    });
    const result = await newEntry.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT} ...`));
