const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// configure transporter (using Gmail)
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "forcejod@gmail.com",  // replace with your Gmail
    pass: "vdnx nyje cicn xhdl"     // use Gmail App Password (not normal password)
  }
});

// POST route for callback form
app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: `"Callback Form" <yourgmail@gmail.com>`,
    to: "deletesharma79@gmail.com",
    subject: "New Callback Request",
    html: `
      <h3>New Callback Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to send email." });
  }
});

// start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
