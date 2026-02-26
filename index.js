const express = require('express');
const app = express();
app.use(express.json());

const messageHistory = [];

app.get('/messageHistory', (req, res) => {
  res.status(200).json({ messageHistory: messageHistory.slice(-req.query.messagesNum) });
});

app.post('/chat', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "message is required" });
  }
  const newMessage = { id: messageHistory.length + 1, message: req.body.message };
  const arrMessage = newMessage.message.split('-');

  messageHistory.push(newMessage);
  if (messageHistory.length > 50) {
    messageHistory.shift();
  }

  const response = arrMessage.map((item) => {
    if (item === "ping") return "pong";
    if (item === "pong") return "ping";
    return "notPingPong";
  }).join('-');

  res.status(201).json({ response });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
