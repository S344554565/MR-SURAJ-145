// =====================================
// Messenger Bot
// Owner: MR SURAJ
// =====================================

const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const OWNER_NAME = "MR SURAJ";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
});

// Receive messages
app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry) {
      const webhookEvent = entry.messaging[0];

      if (webhookEvent.message) {
        const senderId = webhookEvent.sender.id;

        await axios.post(
          `https://graph.facebook.com/v23.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
          {
            recipient: { id: senderId },
            message: {
              text: `Hello! This is an automatic reply from ${OWNER_NAME}.`
            }
          }
        );
      }
    }

    return res.sendStatus(200);
  }

  res.sendStatus(404);
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Messenger Bot by ${OWNER_NAME} running on port ${PORT}`);
});
