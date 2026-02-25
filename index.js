const express = require('express');
const app = express();
app.use(express.json());

const messageStory = []

app.post('/chat', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "message is required" });
  }
  const newMessage = { id: messageStory.length + 1, message: req.body.message };
  const arrMessage = newMessage.message.split('-');

  messageStory.push(newMessage);

  const response = arrMessage.map((item) => {
    if (item === "ping") return "pong";
    if (item === "pong") return "ping";
    return "notPingPong";
  }).join('-');

  res.status(201).json({ response });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
