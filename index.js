// =====================================
// Messenger Bot Dashboard
// Owner: MR SURAJ
// =====================================

const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const OWNER_NAME = "MR SURAJ";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let totalMessages = 0;
const startTime = Date.now();

// Dashboard
app.get("/", (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Messenger Bot Dashboard</title>
    <style>
      body{
        font-family: Arial;
        background:#121212;
        color:white;
        text-align:center;
        padding:50px;
      }

      .card{
        max-width:500px;
        margin:auto;
        background:#1e1e1e;
        padding:25px;
        border-radius:20px;
      }

      h1{
        color:#00ff99;
      }

      .item{
        margin:15px;
        font-size:20px;
      }
    </style>
  </head>

  <body>
    <div class="card">
      <h1>Messenger Bot Dashboard</h1>

      <div class="item">
        <b>Owner:</b> ${OWNER_NAME}
      </div>

      <div class="item">
        <b>Status:</b> ONLINE ✅
      </div>

      <div class="item">
        <b>Total Messages:</b> ${totalMessages}
      </div>

      <div class="item">
        <b>Uptime:</b> ${uptime} seconds
      </div>

      <div class="item">
        <b>Webhook:</b> /webhook
      </div>

      <br>
      <h3>Powered by ${OWNER_NAME}</h3>
    </div>
  </body>
  </html>
  `);
});

// Facebook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Receive messages
app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry) {
      for (const event of entry.messaging) {

        if (event.message) {
          totalMessages++;

          const senderId = event.sender.id;
          const messageText =
            event.message.text?.toLowerCase() || "";

          let reply =
            "Hello! This is an automatic reply from MR SURAJ.";

          if (messageText.includes("hi") ||
              messageText.includes("hello")) {
            reply = "Hello 👋 Welcome to MR SURAJ Bot.";
          }

          if (messageText.includes("help")) {
            reply =
              "Available commands:\nhello\nhelp\nowner\ninfo";
          }

          if (messageText.includes("owner")) {
            reply = "Owner: MR SURAJ";
          }

          if (messageText.includes("info")) {
            reply =
              "This is a Messenger Auto Reply Bot powered by MR SURAJ.";
          }

          try {
            await axios.post(
              `https://graph.facebook.com/v23.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
              {
                recipient: {
                  id: senderId
                },
                message: {
                  text: reply
                }
              }
            );
          } catch (err) {
            console.log(err.response?.data || err.message);
          }
        }
      }
    }

    return res.sendStatus(200);
  }

  res.sendStatus(404);
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(
    `Messenger Bot by ${OWNER_NAME} running on port ${PORT}`
  );
});
