require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const request = require("request");

const app = express();
let port = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`[+] Server is running on port: ${port}`);
});

app.post("/api/chat", async (req, res) => {
  const { role, content } = req.body;

  const options = {
    method: "POST",
    url: "https://openai80.p.rapidapi.com/chat/completions",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "6ef72ca321mshb0eea6dc616994cp1bbd27jsnb454f4d6ee8e",
      "X-RapidAPI-Host": "openai80.p.rapidapi.com",
    },
    body: {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) return res.status(500).send(error);

    return res.json(body.choices[0].message);
  });
});
