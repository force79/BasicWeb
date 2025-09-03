import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "forcejod@gmail.com",   // ✅ your Gmail
        pass: "vdnx nyje cicn xhdl"   // ✅ Gmail App Password
      }
    });

    const recipients = ["deletesharma79@gmail.com"];

    let mailOptions = {
      from: `"Ethereal Assurance Leads" <companyemail@gmail.com>`,
      replyTo: email,
      to: recipients,
      subject: `📞 New Callback Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
          <div style="background:#004aad; color:#fff; padding:20px; text-align:center;">
            <h2>New Callback Request</h2>
          </div>
          <div style="padding:20px; color:#333;">
            <p>You received a new callback request from your website:</p>
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:8px; font-weight:bold;">Name:</td>
                <td style="padding:8px;">${name}</td>
              </tr>
              <tr style="background:#f9f9f9;">
                <td style="padding:8px; font-weight:bold;">Email:</td>
                <td style="padding:8px;">${email}</td>
              </tr>
              <tr>
                <td style="padding:8px; font-weight:bold;">Phone:</td>
                <td style="padding:8px;">${phone}</td>
              </tr>
              <tr style="background:#f9f9f9;">
                <td style="padding:8px; font-weight:bold;">Message:</td>
                <td style="padding:8px;">${message || "N/A"}</td>
              </tr>
            </table>
          </div>
          <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#666;">
            © ${new Date().getFullYear()} Ethreal Assurance. All rights reserved.
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Your request has been submitted successfully!" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
}
