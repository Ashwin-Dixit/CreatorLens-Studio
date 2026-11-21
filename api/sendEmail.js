import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendEmailApi(req, res){
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {type, name, email, brand, service, budget, projectDetails, question} = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (type === "question") {
      if (
        typeof email !== "string" ||
        !emailRegex.test(email) ||
        email.length > 254 ||
        typeof question !== "string" ||
        !question.trim() ||
        question.length > 5000
      ) {
        return res.status(400).json({
          success: false,
          message: "A valid email and question are required",
        });
      }

      await transporter.sendMail({
        from: `"Website Contact Form" <${process.env.GMAIL_USER}>`,
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: "Question from the website",
        text: `Email: ${email}\n\nQuestion:\n${question.trim()}`,
      });

      return res.status(200).json({
        success: true,
        message: "Question sent successfully",
      });
    }

    if (!name || !email || !brand || !service || !budget || !projectDetails) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      name.length > 100 ||
      email.length > 254
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    const mailOptions = {
      from: `"Website Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Request service ${service}`,

      text: `
            Name: ${name}
            Email: ${email}

            Brand: ${brand}
            Service: ${service}
            Budget: ${budget}
            Project details: ${projectDetails}
                `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Email service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};

export default sendEmailApi
