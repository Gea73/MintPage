import nodemailer from "nodemailer";


try {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASSWORD undefined");
  }

} catch (error) {
  console.error(error)
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, //  email
    pass: process.env.EMAIL_PASS, //  App Password
  },
});

export { transporter };
