require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Form = require("./schemas");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://barnetttechnologies.com"); // '*' allows any domain, you might want to restrict it to your front-end's domain in production
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/dist");

app.use(express.static(buildPath));

mongoose.connect(process.env.VITE_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) =>
  console.error("MongoDB Connection Error:", error)
);

// Create a route for sending emails
app.get("/*", (req, res) => {
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

  console.log(key);

  if (key != process.env.VITE_API_KEY) {
    res.status(500).send("unauthorized");
  }

  const type = req.params["type"];
  const { firstName, lastName, issue, phoneNumber, email, address } = req.body;

  try {
    const newEntry = Form({
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
