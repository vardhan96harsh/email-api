
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
 
// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Securely stored email
    pass: process.env.EMAIL_PASS,
     // Securely stored password or app password
  },
});

// API Endpoint to Send Emails
app.post("/api/send-email", (req, res) => {
  const { email, subject, message } = req.body;

  // Check if all required fields are present
  if (!email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: email, // Recipient's email
    subject: subject,
    text: message,
  };

  // Send Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to send email." });
    }
    res.status(200).json({ message: "Email sent successfully!" });
  });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
