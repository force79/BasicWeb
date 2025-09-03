import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "forcejod@gmail.com",       // your Gmail
      pass: "vdnx nyje cicn xhdl"          // Gmail App Password
    }
  });

  const mailOptions = {
    from: `"Callback Form" <yourgmail@gmail.com>`,
    to: "deletesharma79@gmail.com",
    subject: "📞 New Callback Request",
    html: `
      <h2>New Callback Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b> ${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "✅ Request sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "❌ Failed to send request." });
  }
}
