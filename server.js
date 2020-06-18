const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  host: "mailhog",
  port: 1025,
});

app.get("/send_email/:email", (req, res) => {
  const { email } = req.params;

  const messageStatus = transporter.sendMail({
    from: "My Company <company@companydomain.org>",
    to: email,
    subject: "Hi Mailhog!",
    text: "This is the email content",
  });

  if (!messageStatus) res.json("Error sending message!").status(500);

  res.json("Sent!").status(200);
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
