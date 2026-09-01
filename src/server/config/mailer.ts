import nodemailer from "nodemailer";


const __dirname = import.meta.dirname;

try {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Nodemailer Email User or Password not defined");
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
