const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/callback", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "forcejod@gmail.com", // ✅ your company email
        pass: "vdnx nyje cicn xhdl" // ✅ Gmail App Password
      }
    });

    const recipients = [
      "deletesharma79@gmail.com"
      // "mahee@etherealassurance.com"
    ];

    let mailOptions = {
    from: `"Ethereal Assurance Leads" <companyemail@gmail.com>`,
    replyTo: email,
    to: recipients,
    subject: `📞 New Callback Request from ${name}`,
    html: `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background:#f5f7fa; padding:30px;">
    <div style="max-width:650px; margin:0 auto; background:#fff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.08); overflow:hidden;">
      
      <!-- Header -->
      <div style="background:#004aad; color:#fff; padding:25px; text-align:center;">
        <img src="https://via.placeholder.com/150x50?text=LOGO" alt="Company Logo" style="max-height:50px; margin-bottom:10px;">
        <h2 style="margin:0; font-size:22px; letter-spacing:0.5px;">New Callback Request</h2>
      </div>
      
      <!-- Body -->
      <div style="padding:30p
      x; color:#333;">
        <p style="font-size:16px; margin-bottom:20px;">Hello Team,</p>
        <p style="font-size:15px; margin-bottom:25px;">You’ve received a new <strong>callback request</strong> via your website:</p>

        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr style="background:#f9f9f9;">
            <td style="padding:12px; font-weight:bold; width:120px;">Name</td>
            <td style="padding:12px;">${name}</td>
          </tr>
          <tr>
            <td style="padding:12px; font-weight:bold;">Email</td>
            <td style="padding:12px;">${email}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:12px; font-weight:bold;">Phone</td>
            <td style="padding:12px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding:12px; font-weight:bold;">Message</td>
            <td style="padding:12px;">${message || "N/A"}</td>
          </tr>
        </table>

        <div style="text-align:center; margin-top:30px;">
          <a href="tel:${phone}" style="display:inline-block; background:#004aad; color:#fff; text-decoration:none; padding:12px 25px; border-radius:6px; font-size:15px; font-weight:bold;">
            📞 Call Back Now
          </a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background:#f1f1f1; padding:20px; text-align:center; font-size:12px; color:#666;">
        <p style="margin:0;">© ${new Date().getFullYear()} <strong>Ethereal Assurance</strong>. All rights reserved.</p>
        <p style="margin:5px 0 0;">This is an automated email, please do not reply.</p>
      </div>
    </div>
  </div>
  `
};

    // Send email and log details
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    console.log("📤 Message ID:", info.messageId);
    console.log("📧 Sent to:", recipients.join(", "));

    res.status(200).json({ success: true, message: "Your request has been submitted successfully!" });
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
