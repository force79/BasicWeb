const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Route
app.post("/callback", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    // Configure Nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mahee@ethereal.com",   // 👈 apna gmail
        pass: "vdnx nyje cicn xhdl"      // 👈 Gmail App Password (normal password nahi chalega)
      }
    });

    // Mail content
    let mailOptions = {
      from: email,
      to: "deletesharma79@gmail.com", // 👈 jaha pe lead chahiye
      subject: "New Call Back Request",
      text: `You got a new request:
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}`
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Your request has been submitted successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});